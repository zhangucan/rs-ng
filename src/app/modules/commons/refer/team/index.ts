import {ApiDataProps, DataItemProps, DataType} from '@er/types';
import {Team} from '@org/team';
import {OrgBase} from 'src/app/modules/org/base';

export const TeamRef = {
  key: 'team',
  label: '项目组',
  dataType: DataType.JSON,
  defaultKey: Team.fields.name.key,
  apiDataProps: <ApiDataProps>{
    apiEntry: Team.apiEntry,
    searchFields: Team.fields.name.key,
    returnFields: [
      Team.fields.name.key,
      Team.fields.teamId.key,
      Team.fields.code.key,
      Team.fields.parent.key,
      Team.fields.teamId.key
    ],
  },
  dataItemProps: <DataItemProps>{
    labelKey: Team.fields.name.key,
    valueKey: [
      Team.fields.id.key,
      Team.fields.name.key,
      Team.fields.code.key,
      Team.fields.teamId.key,
      Team.fields.parent.defaultKey
    ],
    template: item => {
      return `${item[OrgBase.fields.name.key]}&nbsp;<span class="badge badge-pill badge-primary">${
        item[OrgBase.fields.parent.key][OrgBase.fields.name.key]
        }</span>`;
    },
  },
};
