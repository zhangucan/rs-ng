import {DataField, DataType} from '@er/types';

export const DEPT_FIELD = <DataField>{
  key: 'dept',
  label: '部门',
  dataType: DataType.JSON,
  defaultKey: 'name',
  sortKey: 'code'
};
