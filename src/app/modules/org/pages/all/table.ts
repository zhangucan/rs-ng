import {PngTableColumnProps, PngTableProps} from '@er/primeng';
import {DataAttr, Order, OverlayContext, OverlayType} from '@er/types';
import {Org} from '@org/org';
import {DISPLAY_ORDER_KEY, ORG_ID_KEY} from '@shares';
import * as esb from 'elastic-builder';

export const table = <PngTableProps>{
  entity: Org,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Org.fields.parent,
      dataAttr: DataAttr.TAG,
      toolTip: '@row.parent.code'
    },
    {
      dataField: Org.fields.code,
      hidden: true,
      fetch: true
    },
    {
      dataField: Org.fields.name,
      toolTip: '@row.code',
      overlays: <OverlayContext>{
        type: OverlayType.TABLE,
        content: (ctx) => {
          return <PngTableProps>{
            caption: '异动记录',
            entity: Org,
            paginatorPosition: 'bottom',
            alwaysShowPaginator: false,
            columns: <PngTableColumnProps[]>[
              {
                dataField: Org.fields.changeDate
              },
              {
                dataField: Org.fields.name
              },
              {
                dataField: Org.fields.parent
              }
            ],
            $ext: {
              apiDataProps: {
                query: [
                  esb.termQuery(ORG_ID_KEY, ctx['row'][ORG_ID_KEY])
                ],
                filter: esb.boolQuery().mustNot(esb.termQuery(Org.fields.isCurrent.key, true)),
                sort: {[Org.fields.changeDate.key]: Order.DESC}
              },
              emptyMessage: '没有异动信息'
            }
          };
        }
      }
    },
    {
      dataField: Org.fields.orgType,
      dataAttr: DataAttr.TAG,
      filterKey: 'orgType.name'
    },
    {
      dataField: Org.fields.isCurrent,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Org.fields.changeDate,
      dataAttr: DataAttr.TAG
    },
    {
      dataField: Org.fields.changeType,
      dataAttr: DataAttr.TAG,
      hidden: true
    },
    {
      dataField: Org.fields.inUse,
      dataAttr: DataAttr.TAG
    }
  ],
  $ext: {
    apiDataProps: {
      sort: [DISPLAY_ORDER_KEY, Org.fields.code.key]
    },
    rowExpandable: true,
    hasDeleteAction: true
  }
};
