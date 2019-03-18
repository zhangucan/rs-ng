import {DataField, DataType} from '@er/types';

export const TEAM_FIELD = <DataField>{
  key: 'team',
  label: '项目组',
  dataType: DataType.JSON,
  defaultKey: 'name',
  sortKey: 'code'
};
