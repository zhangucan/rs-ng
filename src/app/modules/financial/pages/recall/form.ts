import {ErFormlyFieldConfig} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {Recall} from '../../fields/recall';

export const form = <FormProps>{
  entity: Recall,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Recall.fields.staff
    },
    {
      dataField: Recall.fields.dismissDate
    }
  ]
};
