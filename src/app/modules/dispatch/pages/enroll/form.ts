import {AuthUtils} from '@er/core';
import {ErFormlyFieldConfig} from '@er/formly';
import {PngFormlyTypes} from '@er/formly-primeng';
import {FormProps, UiLandscape} from '@er/types';
import {DateUtils} from '@er/utils';
import {Enroll} from '../../fields/enroll';

export const form = <FormProps>{
  entity: Enroll,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    //  ...orgEmpFields(Enroll.fields.bizDate.key, Enroll.fields.bizDate.label, '招聘专员'),
    {
      dataField: Enroll.fields.amount
    },
    {
      dataField: Enroll.fields.employer
    },
    {
      dataField: Enroll.fields.isAgent
    },
    {
      dataField: Enroll.fields.agent,
      hideExpression: (model) => !model['isAgent']
    },
    {
      className: 'section-label',
      template: '<hr /><div class="text-center font-size-5 mb-2"><strong>入职员工</strong></div>'
    },
    {
      key: 'staff',
      fieldGroup: <ErFormlyFieldConfig[]>[
        {
          dataField: Enroll.fields.staff.fields.name
        },
        {
          dataField: Enroll.fields.staff.fields.gender,
          type: PngFormlyTypes.radio
        },
        {
          dataField: Enroll.fields.staff.fields.idCard
        },
        {
          dataField: Enroll.fields.staff.fields.phone
        }
      ],
      props: {
        render: (value) => `
               <div class="d-flex flex-column mb-3 card shadow-lg">
               <div class="m-3 border-bottom font-size-6">
                     <span><i class="fa fa-user"></i> 姓名:</span>
                     <span>${value.name || ''}</span> 
               </div>
               <div class="m-3 border-bottom font-size-6">
                     <span><i class="fa fa-phone"></i> 电话:</span>
                     <span>${value.phone || ''}</span> 
               </div>
               <div class="m-3 border-bottom font-size-6">
                    <span><i class="fa fa-id-card"></i> 身份证号:</span>
                    <span>${value.idCard || ''}</span> 
               </div>                   
               </div>
            `
      }
    }
  ],
  hooks: {
    onInit: (formlyForm) => {
      const action = formlyForm._action;
      if (action !== 'audit' && !formlyForm.modelId) {
        const emp = {
          id: AuthUtils.getCurrentUser().id,
          empId: AuthUtils.getCurrentUser().empId,
          name: AuthUtils.getCurrentUser().name
        };
        formlyForm.patchModel({
          emp,
          [Enroll.fields.bizDate.key]: DateUtils.getDate(),
        });
        //  fillInOrgInfo(formlyForm);
      }
    }
  },
  resetKeys: Enroll.fields.staff.key,
  // beforeSubmit: getOrgEmpSubmitModel
};
