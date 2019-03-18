import {Employee} from '@employee';
import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr, Order, Overlay, OverlayType} from '@er/types';
import {DataTableUtils} from '@shares';
import * as esb from 'elastic-builder';

export const table = <PngTableProps>{
  entity: Employee,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Employee.fields.empId,
      hidden: true,
      fetch: true
    },
    {
      dataField: Employee.fields.name,
      overlays: <Overlay>{
        type: OverlayType.TABLE,
        content: ctx => {
          return <PngTableProps>{
            caption: '异动历史',
            entity: Employee,
            paginatorPosition: 'bottom',
            columns: <PngTableColumnProps[]>[
              {
                dataField: Employee.fields.changeDate,
                width: 0
              },
              {
                dataField: Employee.fields.dept
              },
              {
                dataField: Employee.fields.team
              }
            ],
            $ext: {
              apiDataProps: {
                query: [esb.termQuery(Employee.fields.empId.key, ctx['row'].empId)],
                filter: esb.boolQuery().mustNot(esb.termQuery(Employee.fields.isCurrent.key, true)),
                sort: {[Employee.fields.changeDate.key]: Order.DESC}
              }
            }
          };
        }
      }
    },
    {
      dataField: Employee.fields.post,
      toolTip: ctx => ctx.row['post'] && ctx.row['post']['code'],
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.title,
      toolTip: ctx => ctx.row['title'] && ctx.row['title']['code'],
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.dept,
      toolTip: ctx => ctx.row['dept'] && ctx.row['dept']['code'],
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.leaveDate,
      dataAttr: DataAttr.TAG
    }
  ],
  $ext: {
    apiDataProps: {
      query: [
        esb.boolQuery().mustNot(esb.termQuery(Employee.fields.isCurrent.key, true)),
        DataTableUtils.getRoleBasedQuery()
      ],
      sort: [Employee.fields.leaveDate.key, 'empId']
    },
    hasEditAction: true,
    rowExpandable: true
  }
};
