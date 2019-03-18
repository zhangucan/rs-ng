import {DataAttr} from '@er/types';
import {OrgBase, orgParentProps} from '../base';

const apiEntry = 'sys-org';

export const Corp = {
  key: 'corp',
  label: '公司',
  apiEntry: apiEntry,
  fields: {
    ...OrgBase.fields,
    name: {
      ...OrgBase.fields.name,
      label: '公司名称'
    },
    corpId: {
      key: 'corpId',
      label: '公司ID',
      dataAttr: DataAttr.ID
    },
    parent: {
      ...OrgBase.fields.parent,
      label: '上级公司',
      ...orgParentProps(apiEntry)
    },
  }
};
