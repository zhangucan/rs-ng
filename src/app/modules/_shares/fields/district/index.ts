import {ApiDataProps, DataField, DataType} from '@er/types';
import {DROP_DOWN_ITEM_TPL} from '../../templates';

export const DISTRICT_FIELD = <DataField>{
  key: 'district',
  label: '归属地',
  required: true,
  sortKey: `district.code`,
  dataType: DataType.JSON,
  apiDataProps: <ApiDataProps>{
    apiEntry: 'dic-hubei',
    searchFields: 'name',
    returnFields: ['name', 'code'],
    sort: ['code'],
    size: 10
  },
  dataItemProps: {
    labelKey: 'name',
    valueKey: ['code', 'name'],
    ...DROP_DOWN_ITEM_TPL
  },
  defaultKey: 'name',
  description: '所属市、洲、县'
};
