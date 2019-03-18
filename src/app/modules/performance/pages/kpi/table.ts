import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import {Kpi} from '../../fields/kpi';

export const table = <PngTableProps>{
  entity: Kpi,
  columns: <PngTableColumnProps[]>[

    {
      dataField: Kpi.fields.kpiType,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Kpi.fields.amount
    },
    {
      dataField: Kpi.fields.isCash
    },
    {
      dataField: Kpi.fields.occurDate
    },
    {
      dataField: Kpi.fields.describe
    }
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true,
    rowExpandable: true
  }
};
