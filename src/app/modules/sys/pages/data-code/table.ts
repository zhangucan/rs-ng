import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {typePermission} from '@shares';
import {DataCode} from '../../fields/data-code';

export const table = <PngTableProps>{
  entity: DataCode,
  columns: <PngTableColumnProps[]>[
    {
      dataField: DataCode.fields.code
    },
    {
      dataField: DataCode.fields.name,
      toolTip: '@row.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: DataCode.fields.catCode,
      toolTip: '@row.catCode.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: DataCode.fields.type,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: DataCode.fields.inUse,
      dataAttr: DataAttr.TAG,
      hidden: true
    },
    {
      dataField: DataCode.fields.abbr,
      hidden: true
    },
    {
      dataField: DataCode.fields.displayOrder,
      hidden: true
    },
    {
      dataField: DataCode.fields.comment,
      hidden: true
    }
  ],
  $ext: {
    apiDataProps: {
      sort: [`${DataCode.fields.catCode.key}.code`, DataCode.fields.code.key]
    },
    hasAddAction: true,
    hasDeleteAction: typePermission(),
    hasEditAction: true,
    rowExpandable: true
  }
};
