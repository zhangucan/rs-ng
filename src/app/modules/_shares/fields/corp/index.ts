import {DataField, DataType} from '@er/types';

export const CORP_FIELD = <DataField>{
  key: 'corp',
  label: '公司',
  dataType: DataType.JSON,
  defaultKey: 'name',
  sortKey: 'code'
};
