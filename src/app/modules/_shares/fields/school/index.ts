import {ApiDataProps, DataField, DataType} from '@er/types';
import {DROP_DOWN_ITEM_TPL} from '../../templates';

export const SCHOOL_FIELD = <DataField>{
  key: 'school',
  label: '毕业学校',
  required: true,
  sortKey: `school.code`,
  dataType: DataType.JSON,
  apiDataProps: <ApiDataProps>{
    apiEntry: 'dic-university',
    searchFields: 'name',
    returnFields: ['name', 'code'],
    withZh: true,
    withWildcard: true,
    withPy: true,
    sort: ['code'],
    size: 20
  },
  dataItemProps: {
    //  labelKey: 'name',
    valueKey: 'name',
    ...DROP_DOWN_ITEM_TPL
  },
//  defaultKey: 'name'
};
