import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {DataCodeCat} from '../../fields/data-code-cat';

export const form = <FormProps>{
  entity: DataCodeCat,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: DataCodeCat.fields.code,
    },
    {
      dataField: DataCodeCat.fields.name,
    },
    {
      dataField: DataCodeCat.fields.type
    },
    {
      dataField: DataCodeCat.fields.displayOrder
    },
    {
      dataField: DataCodeCat.fields.comment
    },
    {
      dataField: DataCodeCat.fields.inUse
    }
  ],
  beforeSubmit: (ctx) => FormlyUtils.resolveDistinctFieldValue(ctx, DataCodeCat)
};
