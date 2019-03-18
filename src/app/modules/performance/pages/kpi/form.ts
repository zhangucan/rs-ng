import {ErFormlyFieldConfig} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {NgValidators} from '@er/validate';
import {Kpi} from '../../fields/kpi';

export const form = <FormProps>{
  entity: Kpi,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    // ...orgEmpFields(Kpi.fields.occurDate.key, Kpi.fields.occurDate.label),
    {
      dataField: Kpi.fields.kpiType
    },
    {
      dataField: Kpi.fields.isCash
    },
    {
      dataField: Kpi.fields.amount
    },
    {
      dataField: Kpi.fields.describe,
      validators: NgValidators.minLength(4)
    }
  ],
  // beforeSubmit: ctx => getOrgEmpSubmitModel(ctx)
};
