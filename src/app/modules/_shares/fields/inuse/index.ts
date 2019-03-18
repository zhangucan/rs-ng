import {DataField, DataType} from '@er/types';

export const IN_USE_FIELD = <DataField>{
  key: 'inUse',
  label: '启用状态',
  dataType: DataType.BOOLEAN,
  defaultValue: true,
  description: '设置是否在系统内使用'
};
