import {DataAttr, DataType} from '@er/types';
import {OrgBase, orgParentProps} from '../base';
import {Corp} from './corp';

const apiEntry = 'sys-org';

export const Dept = {
  key: 'dept',
  label: '部门',
  apiEntry: apiEntry,
  fields: {
    ...OrgBase.fields,
    name: {
      ...OrgBase.fields.name,
      label: '部门名称'
    },
    deptId: {
      key: 'deptId',
      label: '部门ID',
      dataType: DataType.STRING,
      dataAttr: DataAttr.ID
    },
    parent: {
      ...OrgBase.fields.parent,
      label: '所属公司',
      ...orgParentProps(Corp.apiEntry)
    }
  }
};
