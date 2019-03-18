import {Employee} from '@employee';
import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {EMPLOYEE_API_ENTRY, EMPLOYEE_ID_KEY, IS_CURRENT_KEY, ORG_TREE_SELECTOR} from '@shares';

export const form = <FormProps>{
  entity: Employee,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Employee.fields.name
    },
    ...ORG_TREE_SELECTOR,
    {
      dataField: Employee.fields.leader
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
