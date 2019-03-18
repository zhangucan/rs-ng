import * as esb from 'elastic-builder';
import {Roles} from '@er/types';
import {AuthUtils} from '@er/core';
import {DIC_CAT_MAPPING} from '../../commons/mapping';

export function getBaseInfo(obj: any, type: String) {
  const result = {
    previous: '空',
    current: '空'
  };
  if (obj['previous']) {
    if (obj['previous'][`${type}`]) {
      result.previous = obj.previous[`${type}`].name;
    }
  }
  if (obj['current'][`${type}`]) {
    if (obj['current'][`${type}`]) {
      result.current = obj.current[`${type}`].name;
    }
  }
  return result;
}

export function getEmpStatus(obj: any) {
  let status = '未知';
  if (obj.previous) {
    status = '入职';
  } else if (obj.current) {
    status = '离职';
  } else {
    status = '异动';
  }
  return status;
}

export function getAchievementGlobalQuery() {
  const empId = AuthUtils.getCurrentUser().empId;
  const org = <any>AuthUtils.getCurrentUser().org;
  const title = AuthUtils.getCurrentUser()['title'];
  const roles: string[] = AuthUtils.getCurrentUser().roles || [Roles.USER];
  let gQuery = {};
  if (empId && roles.indexOf(Roles.USER) >= 0) {
    const flag = DIC_CAT_MAPPING.ZJ.YG.code === title.code;
    if (flag) {
      gQuery = esb.termQuery('emp.empId', empId);
    } else {
      gQuery = esb.prefixQuery('emp.org.code', org.code);
    }
  }
  return gQuery;
}
