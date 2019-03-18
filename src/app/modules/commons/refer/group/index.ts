import {ApiDataProps, DataItemProps, DataType} from '@er/types';
import {Group} from '@org/group';
import {OrgBase} from 'src/app/modules/org/base';

export const GroupRef = {
  key: 'group',
  label: '小组',
  dataType: DataType.JSON,
  defaultKey: Group.fields.name.key,
  apiDataProps: <ApiDataProps>{
    apiEntry: Group.apiEntry,
    searchFields: Group.fields.name.key,
    returnFields: [
      Group.fields.name.key,
      Group.fields.groupId.key,
      Group.fields.code.key,
      Group.fields.parent.key,
      Group.fields.groupId.key
    ],
  },
  dataItemProps: <DataItemProps>{
    labelKey: Group.fields.name.key,
    valueKey: [
      Group.fields.id.key,
      Group.fields.name.key,
      Group.fields.code.key,
      Group.fields.groupId.key,
      Group.fields.parent.defaultKey
    ],
    template: item => {
      return `${item[OrgBase.fields.name.key]}&nbsp;<span class="badge badge-pill badge-primary">${
        item[OrgBase.fields.parent.key][OrgBase.fields.name.key]
        }</span>`;
    },
  },
};
