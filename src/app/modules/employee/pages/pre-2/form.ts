import {ErFormlyFieldConfig} from '@er/formly';
import {PngFormlyTypes, PngFormlyWrappers} from '@er/formly-primeng';
import {FormProps, UiLandscape} from '@er/types';
import {PreEmployee} from '../../fields/pre';

export const form = <FormProps>{
  entity: PreEmployee,
  caption: '复试员工信息录入',
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroupClassName: 'row',
      fieldGroup: <ErFormlyFieldConfig[]>[
        {
          dataField: PreEmployee.fields.name,
          type: PngFormlyTypes.value,
          className: 'col-6'
        },
        {
          dataField: PreEmployee.fields.idCard,
          type: PngFormlyTypes.value,
          className: 'col-6'
        },
        {
          dataField: PreEmployee.fields.phone,
          type: PngFormlyTypes.value,
          className: 'col-6'
        },
        {
          dataField: PreEmployee.fields.school,
          type: PngFormlyTypes.value,
          className: 'col-6'
        },
        {
          dataField: PreEmployee.fields.degree,
          type: PngFormlyTypes.value,
          className: 'col-6'
        },
        {
          dataField: PreEmployee.fields.native,
          type: PngFormlyTypes.value,
          className: 'col-6'
        }
      ],
      templateOptions: {
        panel: {
          header: '人员基本信息'
        }
      }
    },
    {
      wrappers: PngFormlyWrappers.pngPanelWrapper,
      fieldGroup: [
        {
          dataField: PreEmployee.fields.post1,
          type: PngFormlyTypes.value,
        },
        {
          dataField: PreEmployee.fields.note1,
          type: PngFormlyTypes.value,
          hideExpression: model => !model['note1']
        },
        {
          dataField: PreEmployee.fields.occur1,
          type: PngFormlyTypes.value
        }
      ],
      templateOptions: {
        panel: {
          header: '初试情况',
          barStyleClass: 'bg-green white'
        }
      }
    },
    {
      dataField: PreEmployee.fields.post2
    },
    {
      dataField: PreEmployee.fields.result2
    },
    {
      dataField: PreEmployee.fields.note2
    }
  ],
  beforeSubmit: ctx => {
    ctx.model['stage'] = 2;
  }
};
