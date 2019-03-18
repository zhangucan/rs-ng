import {PngTreeProps} from '@er/primeng';
import {MAX_SIZE} from '../../constants';

export const MENU_API_ENTRY = 'sys-menu';

export const MENU_TREE_PROPS = <PngTreeProps>{
  selectionMode: 'single',
  $ext: {
    virtualRoot: {label: '系统菜单', data: {code: '0'}},
    caption: '菜单树',
    apiDataProps: {
      apiEntry: MENU_API_ENTRY,
      size: MAX_SIZE
    },
    dataItemProps: {
      idKey: 'code',
      parentKey: 'parent',
      labelKey: 'label'
    }
  }
};
