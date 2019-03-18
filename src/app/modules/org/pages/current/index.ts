import {PngTreeProps} from '@er/primeng';
import {PageModel} from '@er/types';
import {onNodeSelect, ORG_AUTO_COMPLETE} from '@shares';
import * as esb from 'elastic-builder';
import {form} from './form';
import {table} from './table';

export const current = <PageModel>{
  form,
  table,
  tree: <PngTreeProps>{
    ...ORG_AUTO_COMPLETE,
    onNodeSelect: (event) => onNodeSelect(event, esb.termQuery('parent.code', event.node.data.code))
  }
};
