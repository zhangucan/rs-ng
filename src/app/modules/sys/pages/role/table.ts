import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {Role} from '../../fields/role';

export const table = <PngTableProps>{
  entity: Role,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Role.fields.code
    },
    {
      dataField: Role.fields.name,
      toolTip: '@row.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Role.fields.isManager,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Role.fields.inUse,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Role.fields.displayOrder,
      hidden: true
    },
    {
      dataField: Role.fields.description,
      hidden: true
    }
  ],
  $ext: {
    apiDataProps: {
      sort: Role.fields.code.key
    },
    rowExpandable: true,
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true
  }
};
