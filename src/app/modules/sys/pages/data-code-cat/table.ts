import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {DISPLAY_ORDER_KEY, typePermission} from '@shares';
import {DataCodeCat} from '../../fields/data-code-cat';

export const table = <PngTableProps>{
  entity: DataCodeCat,
  columns: <PngTableColumnProps[]>[
    {
      dataField: DataCodeCat.fields.code
    },
    {
      dataField: DataCodeCat.fields.name,
      toolTip: '@row.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: DataCodeCat.fields.type,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: DataCodeCat.fields.displayOrder,
      hidden: true
    },
    {
      dataField: DataCodeCat.fields.comment,
      hidden: true
    }
  ],
  $ext: {
    apiDataProps: {
      sort: [DISPLAY_ORDER_KEY, DataCodeCat.fields.code.key]
    },
    hasAddAction: true,
    hasDeleteAction: typePermission(),
    hasEditAction: true,
    rowExpandable: true
  }
};

