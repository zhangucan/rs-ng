import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import * as moment from 'moment';
import {Profit} from '../../fields/profit';

export const table = <PngTableProps>{
  entity: Profit,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Profit.fields.team,
      dataAttr: DataAttr.TAG,
    },
    {
      dataField: Profit.fields.manager
    },
    {
      dataField: Profit.fields.commonCost
    },
    {
      dataField: Profit.fields.incoming
    },
    {
      dataField: Profit.fields.teamCost
    },
    {
      dataField: Profit.fields.month,
      cellContent: ctx => moment(ctx.row['month']).format('YYYY-MM')
    },
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true,
    rowExpandable: true
  },
};
