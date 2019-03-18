import {ErFormlyFieldConfig} from '@er/formly';
import {PngAutoCompleteProps} from '@er/primeng';
import {FormProps, UiLandscape} from '@er/types';
import {ROLE_PROPS} from '@shares';
import {User} from '@sys/user';

export const form = <FormProps>{
  entity: User,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      dataField: User.fields.userName
    },
    {
      dataField: User.fields.roles,
      props: <PngAutoCompleteProps>{
        ...ROLE_PROPS,
        multiple: true
      }
    },
    {
      dataField: User.fields.state
    },
    {
      dataField: User.fields.isAdmin
    },
    {
      dataField: User.fields.isSu
    }
  ]
};
