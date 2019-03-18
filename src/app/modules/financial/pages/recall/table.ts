import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import * as moment from 'moment';
import {Recall} from '../../fields/recall';

export const table = <PngTableProps>{
  entity: Recall,
  columns: <PngTableColumnProps[]>[
    {
      label: '求职者姓名',
      dataField: Recall.fields.staff
    },
    // {
    //   label: '求职者联系电话',
    //   dataField: Recall.fields.recruit,
    //   contentKey: 'phoneNumber',
    // },
    {
      dataField: Recall.fields.dismissDate,
      cellContent: ctx => moment(ctx.row['date']).format('YYYY-MM-DD')
    },
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true
    // hasEditAction: true,
  },
};
