import {DataField, DataType} from '@er/types';
import {CODE_FIELD, DESCRIPTION_FIELD, DISPLAY_ORDER_FIELD, IN_USE_FIELD, NAME_FIELD} from '@shares';

export const Role = {
  key: 'role',
  label: '用户角色',
  apiEntry: 'sys-role',
  fields: {
    code: CODE_FIELD,
    name: NAME_FIELD,
    isManager: <DataField>{
      label: '管理角色',
      dataType: DataType.BOOLEAN,
      defaultValue: true
    },
    displayOrder: DISPLAY_ORDER_FIELD,
    inUse: IN_USE_FIELD,
    description: DESCRIPTION_FIELD
  }
};
