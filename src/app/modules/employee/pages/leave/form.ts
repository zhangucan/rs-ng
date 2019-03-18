import {Employee} from '@employee';
import {ErFormlyFieldConfig} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';

export const form = <FormProps>{
  entity: Employee,
  landscape: UiLandscape.horizontal,
  caption: '编辑离职员工信息',
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Employee.fields.name
    },
    {
      dataField: Employee.fields.leaveDate
    },
    {
      dataField: Employee.fields.status
    }
  ],
  beforeSubmit: ctx => {
    // return employeeLeaveSubmit(ctx.model);
  }
};
