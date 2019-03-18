import {Employee} from '@employee';
import {ApiUtils} from '@er/core';
import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {PngAutoCompleteProps} from '@er/primeng';
import {ApiDataProps, ButtonProps, FormProps, UiLandscape} from '@er/types';
import {DialogUtils} from '@er/utils';
import {EMPLOYEE_API_ENTRY, EMPLOYEE_ID_KEY, IS_CURRENT_KEY, ORG_TREE_SELECTOR} from '@shares';
import * as esb from 'elastic-builder';
import {PreEmployee} from '../../fields/pre';

export const entry = <FormProps>{
  entity: Employee,
  caption: '入职员工信息录入',
  landscape: UiLandscape.horizontal,
  fields: [
    <ErFormlyFieldConfig>{
      dataField: Employee.fields.idCard,
      props: <PngAutoCompleteProps>{
        forceSelection: false,
        $ext: {
          buttons: [
            <ButtonProps>{
              title: '关联待入职人员',
              icon: 'fa fa-link',
              onClick: (ctx) => {
                ApiUtils.fetch(<ApiDataProps>{
                  apiEntry: PreEmployee.apiEntry,
                  query: [
                    esb.termQuery(PreEmployee.fields.idCard.key, ctx.formlyForm.model[Employee.fields.idCard.key]),
                    esb.termQuery(PreEmployee.fields.result1.key, true)
                  ],
                  dataPath: 'items'
                }).subscribe(data => {
                  if (data && data.length === 1) {
                    const pre = data[0];
                    delete pre.id;
                    delete pre.stage;
                    ctx.formlyForm.patchModel(data[0]);
                  } else {
                    DialogUtils.error('夹在失败', '当前没有符合条件的待入职人员信息');
                  }
                });
              }
            }
          ]
        }
      }
      // asyncValidators: {
      //   checkExists: {
      //     expression: NgAsyncValidator({
      //       apiEntry: Employee.apiEntry,
      //       query: v => esb.termQuery(Employee.fields.idCard.key, v),
      //       dataPath: 'items',
      //       requestOptions: {
      //        // onSuccess: () => alert()
      //       }
      //     }),
      //     messages: 'aaa'
      //   }
      // },
      // modelOptions: {
      //   updateOn: 'submit'
      // }
    },
    {
      dataField: Employee.fields.name
    },
    ...ORG_TREE_SELECTOR,
    {
      dataField: Employee.fields.leader
    },
    {
      dataField: Employee.fields.entryDate
    },
    {
      dataField: Employee.fields.title
    },
    {
      dataField: Employee.fields.post
    },
    {
      dataField: Employee.fields.phone
    },
    {
      dataField: Employee.fields.currentAddress
    },
    {
      dataField: Employee.fields.idCardAddress
    },
    {
      dataField: Employee.fields.native
    },
    {
      dataField: Employee.fields.school,
      props: {
        forceSelection: false
      }
    },
    {
      dataField: Employee.fields.major,
      props: {
        forceSelection: false
      }
    },
    {
      dataField: Employee.fields.degree
    },
    {
      dataField: Employee.fields.graduationDate
    }
  ],
  beforeSubmit: ctx => {
    const selectedOrg = ctx.model.org;
    Object.assign(ctx.model, {org: selectedOrg.leafOrg});
    delete selectedOrg.org;
    Object.assign(ctx.model, selectedOrg, {[IS_CURRENT_KEY]: true});
    return FormlyUtils.resolveDistinctFieldValue(ctx, Employee, {
      apiEntry: EMPLOYEE_API_ENTRY,
      seqKey: EMPLOYEE_ID_KEY,
      seqLen: 6
    });
  }
};
