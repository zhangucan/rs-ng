import {PngAutoCompleteProps} from '@er/primeng';
import {ApiDataProps} from '@er/types';
import {DROP_DOWN_ITEM_TPL} from '../../templates';

export const ROLE_API_ENTRY = 'sys-role';

export const ROLE_PROPS = <PngAutoCompleteProps>{
  $ext: {
    apiDataProps: <ApiDataProps>{
      apiEntry: ROLE_API_ENTRY,
      searchFields: 'name',
      returnFields: ['name', 'code'],
      sort: 'code'
    },
    dataItemProps: {
      labelKey: 'name',
      valueKey: ['name', 'code'],
      ...DROP_DOWN_ITEM_TPL
    }
  }
};
