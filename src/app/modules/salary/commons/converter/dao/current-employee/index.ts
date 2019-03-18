import {CurrentEmployee} from '@uranplus/cavalry-define';
import {ApiUtils} from '@er/core';
import {Employee} from '@employee';
import * as esb from 'elastic-builder';

const maxSize = 9999;

export function getCurrentEmployees(): Promise<CurrentEmployee[]> {
  return ApiUtils.getByQuery(Employee.apiEntry, {
    size: maxSize
  }).toPromise();
}

export async function getEmployeeByName(
  name,
  monthDate
): Promise<CurrentEmployee> {
  return ApiUtils.getByQuery(Employee.apiEntry, {
    query: esb.termQuery('name', name),
    size: maxSize
  }).toPromise();
}
