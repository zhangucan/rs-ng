import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {resetFieldsApiProps} from '@shares';
import * as esb from 'elastic-builder';
import {DataCode} from '../../fields/data-code';

export const form = <FormProps>{
  entity: DataCode,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: DataCode.fields.catCode
    },
    {
      dataField: DataCode.fields.code
    },
    {
      dataField: DataCode.fields.name
    },
    {
      dataField: DataCode.fields.displayOrder
    },
    {
      dataField: DataCode.fields.type
    },
    {
      dataField: DataCode.fields.inUse
    },
    {
      dataField: DataCode.fields.parent
    }
  ],
  resetKeys: [DataCode.fields.name.key, DataCode.fields.code.key],
  hooks: {
    onInit: formlyForm => {
      FormlyUtils.onFieldChange(formlyForm, DataCode.fields.catCode.key)
        .subscribe((value) => {
          const val = value && value['code'];
          resetFieldsApiProps(formlyForm, val, 'catCode.code', ['code', 'parent']);
        });
      FormlyUtils.initFieldValueFromSelectedTreeNode(formlyForm, DataCode.fields.catCode.key);
    }
  },
  beforeSubmit: (ctx) => FormlyUtils.resolveDistinctFieldValue(ctx, DataCode, {
    query: esb.termQuery('catCode.code', ctx['model']['catCode']['code'])
  })
};
