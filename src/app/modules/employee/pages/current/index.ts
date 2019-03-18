import {PngTreeProps} from '@er/primeng';
import {PageModel} from '@er/types';
import {DataTreeUtils, ORG_AUTO_COMPLETE} from '@shares';
import {form} from './form';
import {table} from './table';

export const current = <PageModel>{
  form,
  table,
  tree: <PngTreeProps>{
    ...ORG_AUTO_COMPLETE,
    onNodeSelect: DataTreeUtils.orgTreeNodeSelectHandler
  }
};
