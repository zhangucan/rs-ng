import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {FormUtils} from '@shares';
import {Competitors} from '../../fields/competitor';

export const form = <FormProps>{
  entity: Competitors,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Competitors.fields.name,
      ...FormUtils.distinctSuggest(Competitors.apiEntry, Competitors.fields.name.key)
    },
    {
      dataField: Competitors.fields.code
    }
  ],
  beforeSubmit: (ctx) => FormlyUtils.resolveDistinctFieldValue(ctx, Competitors)
};
