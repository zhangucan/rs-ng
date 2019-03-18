import {ErFormlyFieldConfig} from '@er/formly';
import {PngFormlyTypes} from '@er/formly-primeng';
import {PngTreeProps} from '@er/primeng';
import {FormProps, UiLandscape} from '@er/types';
import {MENU_TREE_PROPS, ORG_AUTO_COMPLETE} from '@shares';
import {OrgMenu} from '../../fields/org-menu';


export const form = <FormProps>{
  entity: OrgMenu,
  landscape: UiLandscape.horizontal,
  fields: <ErFormlyFieldConfig[]>[
    {
      fieldGroupClassName: 'row',
      fieldGroup: <ErFormlyFieldConfig[]>[
        {
          className: 'col-6',
          dataField: OrgMenu.fields.menus,
          type: PngFormlyTypes.tree,
          props: <PngTreeProps>{
            ...MENU_TREE_PROPS,
            selectionMode: 'checkbox',
            style: {'max-height.px': 200, 'max-width.px': 300, 'overflow': 'auto'},
            $ext: {
              ...MENU_TREE_PROPS.$ext,
              autoExpandLevel: 2
            }
          }
        },
        {
          className: 'col-6',
          dataField: OrgMenu.fields.orgs,
          type: PngFormlyTypes.tree,
          props: <PngTreeProps>{
            ...ORG_AUTO_COMPLETE,
            selectionMode: 'checkbox',
            style: {'max-height.px': 200, 'max-width.px': 300, 'overflow': 'auto'}
          }
        }
      ],
      templateOptions: {
        landscape: UiLandscape.vertical
      }
    }
  ]
};
