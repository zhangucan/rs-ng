import {DataUtils} from '@er/core';
import {PngTreeProps} from '@er/primeng';
import {PageModel} from '@er/types';
import {MENU_TREE_PROPS} from '@shares';

import {form} from './form';
import {table} from './table';

export const menu = <PageModel>{
  form,
  table,
  tree: <PngTreeProps>{
    ...MENU_TREE_PROPS,
    onNodeSelect: (event) => DataUtils.onNodeSelect(event, 'parent.code')
  }
};

