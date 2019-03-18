import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr} from '@er/types';
import * as moment from 'moment';
import {Rate} from '../../fields/rate';

export const table = <PngTableProps>{
  entity: Rate,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Rate.fields.team,
      contentKey: 'name',
      dataAttr: DataAttr.TAG,
    },
    {
      dataField: Rate.fields.managerRate,
      cellContent: ctx => `${ctx.row['managerRate'] * 100}%`,
      label: '经理'
    },
    {
      dataField: Rate.fields.groupleaderRate,
      cellContent: ctx => `${ctx.row['groupleaderRate'] * 100}%`,
      label: '组长'
    },
    {
      dataField: Rate.fields.staffRate,
      cellContent: ctx => `${ctx.row['staffRate'] * 100}%`,
      label: '员工'
    },
    {
      dataField: Rate.fields.month,
      cellContent: ctx => moment(ctx.row['month']).format('YYYY-MM'),
    },
  ],
  $ext: {
    spanHeader: `
      <tr>
         <th></th>
         <th></th>    
         <th colspan="3">提成比例</th>
         <th></th>        
         <th></th>        
      </tr>  
    `,
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true,
    rowExpandable: true,
  },
};
