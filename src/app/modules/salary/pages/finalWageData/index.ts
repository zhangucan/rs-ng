import {PageModel} from '@er/types';
import {table} from './table';
import {DataTreeUtils, ORG_TYPE_CODE} from '@shares';

export const finalWageData = <PageModel>{
  table,
  tree: DataTreeUtils.userOrgTree(ORG_TYPE_CODE.ALL, {
    treeProps: {
      onNodeSelect: DataTreeUtils.orgTreeNodeSelectHandler
    }
  })
};
