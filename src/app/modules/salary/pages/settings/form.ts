import {ErFormlyFieldConfig} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {Settings} from '../../fields/settings';

export const form = <FormProps>{
  entity: Settings,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Settings.fields.title
    },
    {
      dataField: Settings.fields.post,
    },
    {
      dataField: Settings.fields.salary,
    },
    {
      dataField: Settings.fields.rate
    },
  ],
};
