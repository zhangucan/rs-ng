import {ErFormlyFieldConfig} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {Achievement} from '../../fields/achievement';

export const form = <FormProps>{
  entity: Achievement,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    // ...orgEmpFields(Achievement.fields.occurDate.key, Achievement.fields.occurDate.label),
    {
      dataField: Achievement.fields.achievementType
    },
    {
      dataField: Achievement.fields.amount
    }
  ],
  // beforeSubmit: ctx => getOrgEmpSubmitModel(ctx)
};
