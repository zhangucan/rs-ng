import {DataField, DataType} from '@er/types';

export const ORG_API_ENTRY = 'sys-org';

export const ORG_FIELD = <DataField>{
  key: 'org',
  label: '所在组织',
  dataType: DataType.JSON,
  sortKey: 'org.code',
  defaultKey: 'name',
  apiDataProps: {
    apiEntry: ORG_API_ENTRY,
    searchFields: 'name',
    returnFields: ['code', 'name'],
    sort: ['code']
  },
  dataItemProps: {
    labelKey: 'name',
    valueKey: ['code', 'name']
  },
  description: '员工所在组织，必须选择在最后一级'
};
