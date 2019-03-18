import {ErFormlyFieldConfig, FormlyUtils} from '@er/formly';
import {FormProps, UiLandscape} from '@er/types';
import {distinctSuggest} from '@shares';


import {Role} from '../../fields/role';

export const form = <FormProps>{
  entity: Role,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: Role.fields.code,
      ...distinctSuggest(Role.apiEntry, Role.fields.code.key),
      attrs: {
        placeholder: '请输入唯一的代码值'
      },
      templateOptions: {
        description: '内容必须唯一，可以不填，不填时系统自动生成'
      }
    },
    {
      dataField: Role.fields.name
    },
    {
      dataField: Role.fields.isManager
    },
    {
      dataField: Role.fields.displayOrder
    },
    {
      dataField: Role.fields.inUse
    },
    {
      dataField: Role.fields.description
    }
  ],
  resetKeys: [Role.fields.name.key, Role.fields.code.key],
  beforeSubmit: (ctx) => FormlyUtils.resolveDistinctFieldValue(ctx, Role)
};
