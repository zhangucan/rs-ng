import {DataAttr, DataType} from '@er/types';
import {OrgBase, orgParentProps} from '../base';
import {Dept} from './dept';

const apiEntry = 'sys-org';

export const Team = {
  key: 'team',
  label: '项目组',
  apiEntry: apiEntry,
  fields: {
    ...OrgBase.fields,
    name: {
      ...OrgBase.fields.name,
      label: '项目组名称'
    },
    teamId: {
      key: 'teamId',
      label: '项目组ID',
      dataType: DataType.STRING,
      dataAttr: DataAttr.ID
    },
    parent: {
      ...OrgBase.fields.parent,
      label: '所属部门',
      ...orgParentProps(Dept.apiEntry)
    }
  }
};
