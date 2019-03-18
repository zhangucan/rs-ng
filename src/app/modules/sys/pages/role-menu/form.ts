import {PngFormlyTypes} from '@er/formly-primeng';
import {PngTreeProps} from '@er/primeng';
import {FormProps, UiLandscape} from '@er/types';
import {MENU_TREE_PROPS, ROLE_PROPS} from '@shares';
import {RoleMenu} from '../../fields/role-menu';

export const form = <FormProps>{
  entity: RoleMenu,
  landscape: UiLandscape.horizontal,
  fields: [
    {
      dataField: RoleMenu.fields.roles,
      props: {
        ...ROLE_PROPS,
        multiple: true
      }
    },
    {
      dataField: RoleMenu.fields.menus,
      type: PngFormlyTypes.tree,
      props: <PngTreeProps>{
        ...MENU_TREE_PROPS,
        selectionMode: 'checkbox',
        $ext: {
          ...MENU_TREE_PROPS.$ext,
          hasSearchBox: false,
          autoExpandLevel: 2
        }
      }
    },
    {
      dataField: RoleMenu.fields.description
    }
  ]
};
