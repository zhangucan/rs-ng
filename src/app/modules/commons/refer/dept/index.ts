import {ApiDataProps, DataItemProps, DataType} from '@er/types';
import {Dept} from '@org/dept';
import {OrgBase} from 'src/app/modules/org/base';

export const DeptRef = {
  key: 'dept',
  label: '部门',
  dataType: DataType.JSON,
  defaultKey: Dept.fields.name.key,
  apiDataProps: <ApiDataProps>{
    apiEntry: Dept.apiEntry,
    searchFields: Dept.fields.name.key,
    returnFields: [
      Dept.fields.name.key,
      Dept.fields.deptId.key,
      Dept.fields.code.key,
      Dept.fields.parent.key,
      Dept.fields.deptId.key
    ],
  },
  dataItemProps: <DataItemProps>{
    labelKey: Dept.fields.name.key,
    valueKey: [
      Dept.fields.id.key,
      Dept.fields.name.key,
      Dept.fields.code.key,
      Dept.fields.parent.defaultKey,
      Dept.fields.deptId.key
    ],
    template: item => {
      return `${item[OrgBase.fields.name.key]}&nbsp;<span class="badge badge-pill badge-primary">${
        item[OrgBase.fields.parent.key][OrgBase.fields.name.key]
        }</span>`;
    },
  },
};
