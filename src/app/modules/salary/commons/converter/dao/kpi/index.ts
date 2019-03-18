import {KpiPayment} from '@uranplus/cavalry-define';
import {ApiUtils} from '@er/core';
import * as esb from 'elastic-builder';
import {Kpi as KpiFields} from '../../../../../performance/fields/kpi';

const maxSize = 99999;
export async function getKpiEntities(start: string, end: string, teamCodePrefix: string = null): Promise<any[]> {
  let query = null;
  if (teamCodePrefix) {
    query = esb
      .boolQuery()
      .must(esb.prefixQuery('team.code', teamCodePrefix))
      .filter(
        esb
          .rangeQuery('occurDate')
          .lt(end)
          .gte(start)
      );
  } else {
    query = esb
      .rangeQuery('occurDate')
      .lt(end)
      .gte(start);
  }

  const kpiEntities = await ApiUtils.getByQuery(KpiFields.apiEntry, {
    query,
    size: maxSize
  }).toPromise();
  if (!!kpiEntities && kpiEntities.items instanceof Array) {
    return kpiEntities.items;
  } else {
    return [];
  }
}

export function getKpiPaymentFromEntity(entity): KpiPayment {
  return {
    date: entity.occurDate,
    value: entity.amount,
    employee: entity.emp.name,
    employeeId: entity.emp.empId,
    teamCode: entity.team.code,
    team: entity.team.name,
    type: entity.kpiType.name,
    typeCode: entity.kpiType.code,
    isInCash: entity.isCash,
    describe: entity.describe
  };
}
