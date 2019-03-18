import {AuthUtils} from '@er/core';
import {CommonsUtils} from '@er/utils';
import * as esb from 'elastic-builder';
import {ROLE} from '../constants/role';

export class DataTableUtils {
  static getRoleBasedQuery() {
    return esb.matchAllQuery();
    let roles = AuthUtils.getCurrentUser() && AuthUtils.getCurrentUser().roles;
    roles = CommonsUtils.getArrayValue(roles) || [];
    if (
      roles.indexOf(ROLE.codes.SENIOR) >= 0 ||
      roles.indexOf(ROLE.codes.DIRECTOR) >= 0 ||
      roles.length > 0
    ) {
      return esb.matchAllQuery();
    } else if (roles.indexOf(ROLE.codes.MANAGER) >= 0) {
      return esb.prefixQuery('dept.code', AuthUtils.getCurrentUser().dept['code']);
    } else if (roles.indexOf(ROLE.codes.LEADER) >= 0) {
      return esb.prefixQuery('team.code', AuthUtils.getCurrentUser().team['code']);
    } else if (roles.indexOf(ROLE.codes.HEADER) >= 0) {
      return esb.termQuery('group.code', AuthUtils.getCurrentUser().group['code']);
    } else {
      return esb.matchNoneQuery();
    }
  }
}
