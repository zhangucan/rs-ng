import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr, Overlay, OverlayType} from '@er/types';
import {final} from '../../fields/final';
import * as esb from 'elastic-builder';
import {Salary} from '../../fields/salary';
import {CONSTANTS} from '../../../commons/constants';

export const table = <PngTableProps>{
  entity: final,
  scrollable: true,
  columns: <PngTableColumnProps[]>[
    {
      key: 'name',
      label: '姓名',
      frozen: true,
      width: '100px',
      styleClass: 'bg-pink black'
    },
    {
      dataField: final.fields.salary,
      width: '200px',
      defaultCellContent: 0,
      overlays: <Overlay>{
        type: OverlayType.TABLE,
        content: ctx => {
          return <PngTableProps>{
            caption: '时段工资',
            entity: Salary,
            ...CONSTANTS.OVERLAY_TABLE_PROPS,
            columns: <PngTableColumnProps[]>[
              {
                dataField: Salary.fields.start,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.end,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.acture,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.incoming,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.cost,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.profit,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.commissionRate,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.commission,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.loss,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              },
              {
                dataField: Salary.fields.salary,
                ...CONSTANTS.OVERLAY_COLUMN_PROPS
              }
            ],
            $ext: {
              apiDataProps: {
                query: [esb.termQuery('employee', ctx['row'].name)],
                filter: esb.rangeQuery('month').lte(ctx['row'].month),
                sort: Salary.fields.start.key
              }
            }
          };
        }
      }
    },
    {
      dataField: final.fields.should,
      hidden: true,
      fetch: true
    },
    {
      dataField: final.fields.acture,
      label: '出勤',
      dataAttr: DataAttr.TAG,
      cellContent: ctx => {
        const should = ctx['row'].should;
        const acture = ctx['row'].acture;
        if (should && acture) {
          return should === acture ? '全勤' : `缺勤 ${should - acture}`;
        }
        return acture;
      }
    },
    {
      dataField: final.fields.incoming,
      defaultCellContent: 0
    },
    {
      dataField: final.fields.cost,
      defaultCellContent: 0
    },
    {
      dataField: final.fields.profit,
      defaultCellContent: 0,
      cellStyleClass: ctx => {
        const profit = ctx['row'].profit;
        if (profit) {
          return profit <= 0 ? 'red' : '#6699FF';
        }
        return 'black';
      }
    },
    {
      dataField: final.fields.commission,
      dataAttr: DataAttr.CURRENCY
    },
    {
      dataField: final.fields.loss
    },
    {
      dataField: final.fields.deductionInCash
    }
  ],
  $ext: {
    rowHeight: '50px',
    rowStyle: {
      method: ctx => {
        const loss = ctx['row'].loss;
        const bg = loss && loss > 0 ? '#fff' : '#00CCCC';
        return {'background-color': bg};
      }
    }
  }
};
