import {PageModel} from '@er/types';
import {DataTreeUtils, ORG_TYPE_CODE} from '@shares';
import {form} from './form';
import {table} from './table';

export const enroll = <PageModel>{
  table,
  form,
  tree: DataTreeUtils.userOrgTree(
    ORG_TYPE_CODE.ALL,
    {
      treeProps: {
        onNodeSelect: DataTreeUtils.orgTreeNodeSelectHandler
      }
    })
};
