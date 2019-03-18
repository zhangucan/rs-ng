import {DataType} from '@er/types';
import {DESCRIPTION_FIELD, IN_USE_FIELD} from '@shares';


export const OrgMenu = {
  key: 'OrgMenu',
  label: '组织菜单',
  apiEntry: 'sys-org-menu',
  fields: {
    menus: {
      key: 'menus',
      label: '用户菜单',
      dataType: DataType.List
    },
    orgs: {
      key: 'orgs',
      label: '组织机构',
      dataType: DataType.List
    },
    inUse: IN_USE_FIELD,
    description: DESCRIPTION_FIELD
  }
};
