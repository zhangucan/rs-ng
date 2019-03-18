import {ErFormlyFieldConfig} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {FormUtils} from '@shares';
import {Employer} from '../../fields/employer';

export const form = <FormProps>{
  entity: Employer,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Employer.fields.name,
      ...FormUtils.distinctSuggest(Employer.apiEntry, Employer.fields.name.key)
    },
    {
      dataField: Employer.fields.competitors,
      props: {
        dataKey: 'name',
        multiple: true
      }
    },
    {
      dataField: Employer.fields.contact
    },
    {
      dataField: Employer.fields.phone
    },
    {
      dataField: Employer.fields.city
    },
    {
      dataField: Employer.fields.address
    },
    {
      dataField: Employer.fields.inUse
    }
  ]
};
