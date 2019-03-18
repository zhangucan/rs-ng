import {PngTreeProps} from '@er/primeng';
import {ApiDataProps, DataItemProps} from '@er/types';
import {MAX_SIZE} from '../../constants';

export const DISTRICT_API_ENTRY = 'dic-hubei';

export const DISTRICT_TREE_PROPS = <PngTreeProps>{
  selectionMode: 'single',
  $ext: {
    caption: '所辖地区',
    apiDataProps: <ApiDataProps>{
      apiEntry: DISTRICT_API_ENTRY,
      size: MAX_SIZE
    },
    dataItemProps: <DataItemProps>{
      idKey: 'code',
      labelKey: 'abbr',
      levelIdLength: 2
    }
  }
};
