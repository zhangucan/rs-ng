import {ApiDataProps, DataField, DataType} from '@er/types';
import {DROP_DOWN_ITEM_TPL} from '../../templates';

export const CITY_FIELD = <DataField>{
  key: 'city',
  label: '所在城市',
  required: true,
  sortKey: `city.code`,
  dataType: DataType.JSON,
  apiDataProps: <ApiDataProps>{
    apiEntry: 'dic-china',
    searchFields: ['name', 'abbr'],
    returnFields: ['name', 'code'],
    sort: ['code'],
    withWildcard: true,
    withZh: true,
    withPy: true,
    size: 20
  },
  dataItemProps: {
    valueKey: 'name',
    ...DROP_DOWN_ITEM_TPL
  },
  // defaultKey: 'name',
  description: '所属城市'
};
