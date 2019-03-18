import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {RoleMenu} from '../../fields/role-menu';

export const table = <PngTableProps>{
  entity: RoleMenu,
  columns: <PngTableColumnProps[]>[
    {
      dataField: RoleMenu.fields.roles,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: RoleMenu.fields.menus,
      dataAttr: DataAttr.TREE
    }
  ],
  $ext: {
    hasAddAction: true,
    hasEditAction: true,
    hasDeleteAction: true
  }
};

