import {PngTreeProps} from '@er/primeng';
import {PageModel} from '@er/types';
import {onNodeSelect, ORG_AUTO_COMPLETE} from '@shares';
import {table} from './table';

export const all = <PageModel>{
  table,
  tree: <PngTreeProps>{
    ...ORG_AUTO_COMPLETE,
    onNodeSelect: (event) => onNodeSelect(event, 'code')
  }
};
