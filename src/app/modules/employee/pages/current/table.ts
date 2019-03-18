import {Employee} from '@employee';
import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr, Order, OverlayContext, OverlayType} from '@er/types';
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
      overlays: <OverlayContext>{
        type: OverlayType.TABLE,
        content: (ctx) => {
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
                query: [
                  esb.termQuery(Employee.fields.empId.key, ctx['row'].empId)

                ],
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
      toolTip: '@row.post.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.title,
      toolTip: '@row.title.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.dept,
      toolTip: '@row.dept.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.team,
      toolTip: '@row.team.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.group,
      toolTip: '@row.group.code',
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.leader,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Employee.fields.entryDate,
      hidden: true
    }
  ],
  $ext: {
    apiDataProps: {
      query: [esb.termQuery(Employee.fields.isCurrent.key, true), DataTableUtils.getRoleBasedQuery()],
      sort: ['displayOrder', 'empId']
    },
    hasAddAction: true,
    hasEditAction: true,
    hasDeleteAction: true,
    hasAuditAction: true,
    rowExpandable: true
  },
};
