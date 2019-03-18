import {DataField, DataType} from '@er/types';
import {DROP_DOWN_ITEM_TPL} from '../../templates';

export const parentProps = (apiEntry, nameKey: string = 'name', codeKey: string = 'code') => {
  return <DataField>{
    key: 'parent',
    dataType: DataType.JSON,
    defaultKey: nameKey,
    apiDataProps: {
      apiEntry: apiEntry,
      searchFields: nameKey,
      returnFields: [nameKey, codeKey],
      sort: codeKey
    },
    dataItemProps: {
      labelKey: nameKey,
      valueKey: [codeKey, nameKey],
      ...DROP_DOWN_ITEM_TPL
    },
    description: '设置上级节点'
  };
};
