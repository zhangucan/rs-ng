import {ApiDataProps, DataField, DataType} from '@er/types';
import {DROP_DOWN_ITEM_TPL} from '../../templates';

export const MAJOR_FIELD = <DataField>{
  key: 'major',
  label: '所学专业',
  required: true,
  sortKey: `major.code`,
  dataType: DataType.JSON,
  apiDataProps: <ApiDataProps>{
    apiEntry: 'dic-major',
    searchFields: 'name',
    returnFields: ['name', 'code'],
    sort: ['code'],
    withZh: true,
    withWildcard: true,
    withPy: true,
    size: 20
  },
  dataItemProps: {
    // labelKey: 'name',
    valueKey: 'name',
    ...DROP_DOWN_ITEM_TPL
  },
  // defaultKey: 'name'
};
