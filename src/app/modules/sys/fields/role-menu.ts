import {DataType} from '@er/types';
import {DESCRIPTION_FIELD, IN_USE_FIELD} from '@shares';

export const RoleMenu = {
  key: 'ruleMenu',
  label: '角色菜单',
  apiEntry: 'sys-role-menu',
  fields: {
    roles: {
      key: 'roles',
      label: '用户角色',
      dataType: DataType.List,
      defaultKey: 'name'
    },
    menus: {
      key: 'menus',
      label: '可操作菜单',
      dataType: DataType.List
    },
    inUse: IN_USE_FIELD,
    description: DESCRIPTION_FIELD
  }
};
