import {CommissionRates} from '@uranplus/cavalry-define';
import {ApiUtils} from '@er/core';
import {Rate} from '../../../fields/rate';
import esb = require('elastic-builder');

const debug = require('debug')('converter/team-commission-rate');

const maxSize = 99999;
const gRateEntities: Map<string, Promise<CommissionRates[]>> = new Map();

async function _getRateEntities(month: string): Promise<any[]> {
  const rateEntities = await ApiUtils.getByQuery(Rate.apiEntry, {
    query: esb.termQuery('month', month),
    size: maxSize
  }).toPromise();
  if (rateEntities && rateEntities.items instanceof Array) {
    return rateEntities.items;
  } else {
    // default value
    return [];
  }
}

async function getRateEntities(month: string): Promise<any[]> {
  if (!gRateEntities.has(month)) {
    gRateEntities.set(month, _getRateEntities(month));
  }
  return gRateEntities.get(month);
}

export async function getTeamCommissionRates(team: string, manager: string, month: string): Promise<CommissionRates> {
  // Manager is useless here, may use it in future
  const rate = (await getRateEntities(month)).find(rateEntity => rateEntity.team.name === team);

  if (rate) {
    return {...rate, team, manager, teamCode: rate.team.code};
  } else {
    // default team commission rate
    return {
      team,
      manager,
      managerRate: 0.1,
      groupleaderRate: 0.3,
      staffRate: 0.5,
      month
    };
  }
}
