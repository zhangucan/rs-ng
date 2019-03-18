import {Employee} from '@employee';
import {ButtonProps, FormProps, UiLandscape} from '@er/types';
import {orgFields} from '../../../commons/field-props/org';
import {DataUtils} from '@er/core';
import {EMPLOYEE_API_ENTRY, EMPLOYEE_ID_KEY, IS_CURRENT_KEY} from '@shares';

export const entry = <FormProps>{
  entity: Employee,
  caption: '入职员工信息录入',
  landscape: UiLandscape.horizontal,
  fields: [
    {
      dataField: Employee.fields.idCard,
      templateOptions: {
        addonLeft: {
          icon: 'fa fa-search',
          button: <ButtonProps>{
            title: 'sdsd',
            onClick: (ctx) => console.log(ctx)
          }
        }
      }
    },
    {
      dataField: Employee.fields.name
    },
    ...orgFields,
    {
      dataField: Employee.fields.leader,
    },
    {
      dataField: Employee.fields.entryDate
    },
    {
      dataField: Employee.fields.title
    },
    {
      dataField: Employee.fields.post
    }
  ],
  resetKeys: Employee.fields.name.key,
  beforeSubmit: ctx => {
    if (!ctx.model[Employee.fields.empId.key]) {
      ctx.model[Employee.fields.empId.key] = DataUtils.getNextValue({
        apiEntry: EMPLOYEE_API_ENTRY,
        seqKey: EMPLOYEE_ID_KEY,
        seqLen: 6
      });
      ctx.model[IS_CURRENT_KEY] = true;
    }
  }
};
