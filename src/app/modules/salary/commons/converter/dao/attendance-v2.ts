import * as moment from 'moment';
import {Attendance, StaffPosition} from '@uranplus/cavalry-define';
import {ApiUtils} from '@er/core';
import esb = require('elastic-builder');

const debug = require('debug')('converter/attendance-v2');

const maxSize = 99999;
const attendance_index = 'attendance-v2';
const gAttendancesMonthMap = new Map<string, Promise<Map<string, Attendance>>>();

async function getAttendancesOfMonth(dateStr: string) {
  const month = moment(dateStr)
    .startOf('month')
    .format('YYYY-MM-DD');

  if (!gAttendancesMonthMap.has(month)) {
    const body = esb
      .requestBodySearch()
      .query(esb.termQuery('month', month))
      .size(0)
      .agg(
        esb
          .termsAggregation('userAttendance', '姓名')
          .size(99999)
          .aggs([esb.sumAggregation('shouldCount', '应出'), esb.sumAggregation('actureCount', '实出')])
      );

    gAttendancesMonthMap.set(
      month,
      ApiUtils.getByQuery(attendance_index, body)
        .toPromise()
        .then(resp => {
          const userAttendance = new Map<string, Attendance>();
          debug('resp.aggs=', resp.aggs);
          for (const bucket of resp.aggs.userAttendance.buckets) {
            userAttendance.set(bucket.key, {
              should: bucket.shouldCount.value,
              acture: bucket.actureCount.value
            });
          }
          return userAttendance;
        })
    );
  }
  return gAttendancesMonthMap.get(month);
}

async function getAttendanceByStaffPositionViaQuery(staffPosition: StaffPosition): Promise<Attendance> {
  const body = esb
    .requestBodySearch()
    .query(
      esb
        .boolQuery()
        .must(esb.termQuery('姓名', staffPosition.name))
        .filter(
          esb
            .rangeQuery('日期')
            .lt(staffPosition.end)
            .gte(staffPosition.start)
        )
    )
    .size(0)
    .aggs([esb.sumAggregation('shouldCount', '应出'), esb.sumAggregation('actureCount', '实出')]);
  const resp = await ApiUtils.getByQuery(attendance_index, body).toPromise();
  debug('getAttendanceByStaffPositionViaQuery() staffPosition=', staffPosition, 'resp=', resp);
  return {
    should: resp.aggs.shouldCount.value,
    acture: resp.aggs.actureCount.value > 0 ? resp.aggs.actureCount.value : 0
  };
}

export async function getAttendanceByStaffPosition(staffPosition: StaffPosition): Promise<Attendance> {
  const userAttendance = await getAttendancesOfMonth(staffPosition.start);
  if (userAttendance.has(staffPosition.name)) {
    if (
      moment(staffPosition.start).isSame(moment(staffPosition.start).startOf('month')) &&
      moment(staffPosition.end).isSame(
        moment(staffPosition.start)
          .add(1, 'month')
          .startOf('month')
      )
    ) {
      const attendance = userAttendance.get(staffPosition.name);
      if (attendance.acture < 0) {
        attendance.acture = 0;
      }
      return attendance;
    } else {
      return getAttendanceByStaffPositionViaQuery(staffPosition);
    }
  } else {
    const warn =
      'getAttendanceByStaffPosition() ' +
      staffPosition.name +
      '[' +
      staffPosition.start +
      '-' +
      staffPosition.end +
      '] ' +
      'no attendance data found';
    console.warn(warn);
    return {
      acture: moment(staffPosition.end).diff(moment(staffPosition.start), 'day'),
      should: moment(staffPosition.end).diff(moment(staffPosition.start), 'day'),
      warn
    };
  }
}
