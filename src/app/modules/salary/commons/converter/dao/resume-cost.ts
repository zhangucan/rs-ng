import * as moment from 'moment';
import {UserResumeCost} from '@uranplus/cavalry-define';
import {ApiUtils} from '@er/core';
import esb = require('elastic-builder');

const debug = require('debug')('converter/resume-cost');

const maxSize = 99999;
const price = 1.25;
const resumeCostIndex = 'resume-cost';
const gResumeCostMonthMap = new Map<string, Promise<Map<string, UserResumeCost>>>();

async function getResumeCostsOfMonth(dateStr: string) {
  const month = moment(dateStr)
    .startOf('month')
    .format('YYYY-MM-DD');

  if (!gResumeCostMonthMap.has(month)) {
    const body = esb
      .requestBodySearch()
      .query(esb.termQuery('month', month))
      .size(0)
      .agg(
        esb
          .termsAggregation('userResumeCost', '姓名')
          .size(maxSize)
          .agg(esb.sumAggregation('resumeCount', '简历使用量'))
      );

    gResumeCostMonthMap.set(
      month,
      ApiUtils.getByQuery(resumeCostIndex, body)
        .toPromise()
        .then(resp => {
          const userResumeCostMap = new Map<string, UserResumeCost>();
          debug('resp.aggs=', resp.aggs);
          for (const bucket of resp.aggs.userResumeCost.buckets) {
            userResumeCostMap.set(bucket.key, {
              name: bucket.key,
              start: month,
              end: moment(dateStr)
                .add(1, 'month')
                .startOf('month')
                .format('YYYY-MM-DD'),
              count: bucket.resumeCount.value,
              amount: bucket.resumeCount.value * price
            });
          }
          return userResumeCostMap;
        })
    );
  }
  return gResumeCostMonthMap.get(month);
}

async function getUserResumeCostViaQuery(name: string, start: string, end: string): Promise<UserResumeCost> {
  const body = esb
    .requestBodySearch()
    .query(
      esb
        .boolQuery()
        .must(esb.termQuery('姓名', name))
        .filter(
          esb
            .rangeQuery('日期')
            .lt(end)
            .gte(start)
        )
    )
    .size(0)
    .agg(esb.sumAggregation('resumeCount', '简历使用量'));
  const resp = await ApiUtils.getByQuery(resumeCostIndex, body).toPromise();
  debug('getAttendanceByStaffPositionViaQuery() ', name, '[', start, '=>', end, '] resp=', resp);
  return {
    name,
    start,
    end,
    count: resp.aggs.resumeCount.value,
    amount: resp.aggs.resumeCount.value * price
  };
}

export async function getUserResumeCost(name: string, start: string, end: string): Promise<UserResumeCost> {
  const userResumeCostMap = await getResumeCostsOfMonth(start);
  if (userResumeCostMap.has(name)) {
    if (
      moment(start).isSame(moment(start).startOf('month')) &&
      moment(end).isSame(
        moment(start)
          .add(1, 'month')
          .startOf('month')
      )
    ) {
      return userResumeCostMap.get(name);
    } else {
      return getUserResumeCostViaQuery(name, start, end);
    }
  } else {
    const warn = 'getUserResumeCost() ' + name + '[' + start + '-' + end + '] ' + 'no resume cost data found';
    console.warn(warn);
    return {
      name,
      start,
      end,
      count: 0,
      amount: 0,
      warn
    };
  }
}
