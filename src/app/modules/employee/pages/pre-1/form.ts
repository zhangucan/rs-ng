import {FormProps, UiLandscape} from '@er/types';
import {PreEmployee} from '../../fields/pre';

export const form = <FormProps>{
  entity: PreEmployee,
  caption: '初试员工信息录入',
  landscape: UiLandscape.horizontal,
  fields: [
    {
      dataField: PreEmployee.fields.name
    },
    {
      dataField: PreEmployee.fields.idCard
    },
    {
      dataField: PreEmployee.fields.phone
    },
    {
      dataField: PreEmployee.fields.currentAddress
    },
    {
      dataField: PreEmployee.fields.idCardAddress
    },
    {
      dataField: PreEmployee.fields.native
    },
    {
      dataField: PreEmployee.fields.school,
      props: {
        forceSelection: false
      }
    },
    {
      dataField: PreEmployee.fields.major,
      props: {
        forceSelection: false
      }
    },
    {
      dataField: PreEmployee.fields.degree
    },
    {
      dataField: PreEmployee.fields.graduationDate
    },
    {
      dataField: PreEmployee.fields.post1
    },
    {
      dataField: PreEmployee.fields.result1
    },
    {
      dataField: PreEmployee.fields.note1
    },
    {
      dataField: PreEmployee.fields.occur1
    }
  ],
  resetKeys: [PreEmployee.fields.name.key, PreEmployee.fields.idCard.key],
  beforeSubmit: ctx => {
    ctx.model['stage'] = 1;
  }
};
