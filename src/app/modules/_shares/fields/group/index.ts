import {DataField, DataType} from '@er/types';

export const GROUP_FIELD = <DataField>{
  key: 'group',
  label: '小组',
  dataType: DataType.JSON,
  defaultKey: 'name',
  sortKey: 'code'
};
