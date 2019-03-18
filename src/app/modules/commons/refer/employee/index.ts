import {Employee} from '@employee';
import {ApiDataProps, DataField, DataItemProps, DataType} from '@er/types';
import {Dept} from '@org/dept';
import {Group} from '@org/group';
import {Team} from '@org/team';
import * as esb from 'elastic-builder';

export const EmpRef = <DataField>{
  key: 'emp',
  label: '员工',
  dataType: DataType.JSON,
  defaultKey: Employee.fields.name.key,
  apiDataProps: <ApiDataProps>{
    apiEntry: Employee.apiEntry,
    searchFields: Employee.fields.name.key,
    returnFields: [
      Employee.fields.name.key,
      Employee.fields.empId.key,
      Employee.fields.team.key,
      Employee.fields.group.key,
      Employee.fields.dept.key
    ],
    query: esb.termQuery(Employee.fields.isCurrent.key, true)
  },
  dataItemProps: <DataItemProps>{
    labelKey: Employee.fields.name.key,
    template: item => {
      const dept = item[Employee.fields.dept.key];
      const team = item[Employee.fields.team.key];
      const group = item[Employee.fields.group.key];
      return `<span>${item.name}</span>&nbsp;&nbsp;<span class="badge badge-pill badge-dept">${
        dept ? dept[Dept.fields.name.key] : ''
        }</span> <span class="badge badge-pill badge-team">${
        team ? team[Team.fields.name.key] : ''
        }</span><span class="badge badge-pill badge-group">${group ? group[Group.fields.name.key] : ''}
      </span>`;
    }
  }
};




