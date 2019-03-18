import {ErFormlyFieldConfig} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {Employer} from '../../fields/employer';

export const form = <FormProps>{
  entity: Employer,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Employer.fields.name
    },
    {
      dataField: Employer.fields.inUse
    }
  ]
};
