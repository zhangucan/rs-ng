import {DataAttr} from '@er/types';
import {OrgBase, orgParentProps} from '../base';
import {Team} from './team';

const apiEntry = 'sys-org';

export const Group = {
  key: 'group',
  label: '小组',
  apiEntry: apiEntry,
  fields: {
    ...OrgBase.fields,
    name: {
      ...OrgBase.fields.name,
      label: '小组名称'
    },
    groupId: {
      key: 'groupId',
      label: '小组ID',
      dataAttr: DataAttr.ID
    },
    parent: {
      ...OrgBase.fields.parent,
      label: '所属项目组',
      ...orgParentProps(Team.apiEntry)
    }
  }
};
