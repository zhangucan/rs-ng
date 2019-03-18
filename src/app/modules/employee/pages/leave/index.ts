import {PngTreeProps} from '@er/primeng';
import {DataTreeUtils, ORG_AUTO_COMPLETE} from '@shares';
import {form} from './form';
import {table} from './table';

export const leave = {
  form,
  table,
  tree: <PngTreeProps>{
    ...ORG_AUTO_COMPLETE,
    onNodeSelect: DataTreeUtils.orgTreeNodeSelectHandler
  }
};
