import {TeamProfitCost} from '@uranplus/cavalry-define/fruit.class';
import {ApiUtils} from '@er/core';
import * as esb from 'elastic-builder';
import {Profit} from '../../../../../financial/fields/profit';

const maxSize = 9999;

export function getTeamProfitCosts(start: string): Promise<TeamProfitCost[]> {
  return ApiUtils.getByQuery(Profit.apiEntry, {
    query: esb.termQuery(Profit.fields.month.key, start),
    size: maxSize,
  }).toPromise();
}
