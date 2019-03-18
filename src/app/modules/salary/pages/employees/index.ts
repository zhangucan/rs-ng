import {PageModel} from '@er/types';
import {table} from './table';
import {DataTreeUtils} from '@shares';


export const employees = <PageModel>{
  table,
  tree: DataTreeUtils.userOrgTree(null, {
    treeProps: {
      onNodeSelect: DataTreeUtils.orgTreeNodeSelectHandler
    },
  }),
};
