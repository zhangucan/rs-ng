import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {OrgMenu} from '@sys/org-menu';

export const table = <PngTableProps>{
  entity: OrgMenu,
  columns: <PngTableColumnProps[]>[
    {
      dataField: OrgMenu.fields.menus,
      dataAttr: DataAttr.TREE
    },
    {
      dataField: OrgMenu.fields.orgs,
      dataAttr: DataAttr.TREE
    }
  ],
  $ext: {
    hasAddAction: true,
    hasEditAction: true,
    hasDeleteAction: true
  }
};
