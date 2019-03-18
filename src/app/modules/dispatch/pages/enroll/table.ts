import {PngChartComponent, PngTableColumnProps, PngTableProps} from '@er/primeng';
import {AggMethods, ApiDataProps, ChartProps, DataAttr, DynaComponent, Order, Overlay, OverlayType} from '@er/types';
import * as esb from 'elastic-builder';
import {Enroll} from '../../fields/enroll';

export const table = <PngTableProps>{
  entity: Enroll,
  columns: <PngTableColumnProps[]>[
    {
      dataField: Enroll.fields['emp'],
      headerIcon: 'fa fa-bar-chart red',
      headerOverlays: <Overlay> {
        type: OverlayType.COMPONENT,
        content: <DynaComponent>{
          type: PngChartComponent,
          props: <ChartProps>{
            switchable: false,
            dataSource: <ApiDataProps>{
              apiEntry: Enroll.apiEntry,
              aggProps: {
                name: 'emp',
                method: AggMethods.TERMS,
                field: 'emp.name',
                size: 20
              }
            },
            dimensions: {
              title: '入职单位分布图',
              dataSrcPath: 'emp'
            }
          }
        },
        overlayStyle: {left: '10px'}
      },
      overlays: [
        {
          type: OverlayType.CHART,
          content: (ctx) => {
            return <ChartProps> {
              switchable: false,
              dataSource: <ApiDataProps>{
                apiEntry: Enroll.apiEntry,
                aggProps: {name: 'employer', field: `${Enroll.fields.employer.key}.name`, method: AggMethods.TERMS},
                searchFields: `emp.id`,
                withTerm: true,
                queryValue: ctx['row']['emp']['id']
              },
              dimensions: {
                title: `入职单位分布图`,
                dataSrcPath: 'employer'
              }
            };
          }
        },
        {
          type: OverlayType.TABLE,
          content: (ctx) => {
            return <PngTableProps> {
              caption: '已派遣入职明细',
              entity: Enroll,
              alwaysShowPaginator: false,
              paginatorPosition: 'bottom',
              columns: <PngTableColumnProps[]>[
                {dataField: Enroll.fields.staff},
                {dataField: Enroll.fields.employer}
              ],
              $ext: {
                apiDataProps: {
                  query: esb.termQuery('emp.id', ctx['row']['emp']['id']),
                  sort: {[Enroll.fields.bizDate.key]: Order.DESC}
                }
              }
            };
          }
        }
      ]
    },
    {
      dataField: Enroll.fields.amount,
      hidden: true,
      fetch: true
    },
    {
      dataField: Enroll.fields.bizDate
    },
    {
      dataField: Enroll.fields.isAgent
    },
    {
      dataField: Enroll.fields.employer,
      dataAttr: DataAttr.TAG,
      overlays: {
        type: OverlayType.CHART,
        content: (ctx) => {
          return <ChartProps> {
            switchable: false,
            dataSource: <ApiDataProps>{
              apiEntry: Enroll.apiEntry,
              aggProps: [
                {aggs: esb.dateHistogramAggregation('month-count', `${Enroll.fields.bizDate.key}`, '1M')},
                {aggs: esb.dateHistogramAggregation('year-count', `${Enroll.fields.bizDate.key}`, '1y')}
              ],
              searchFields: `employer.id`,
              withTerm: true,
              queryValue: ctx['row']['employer']['id']
            },
            dimensions: [
              {
                title: `月入职人数`,
                dataSrcPath: 'month-count'
              },
              {
                title: `年入职人数`,
                dataSrcPath: 'year-count'
              }
            ]
          };
        }
      }
    },
    {
      dataField: Enroll.fields.staff,
      dataAttr: DataAttr.TAG
    }
  ],
  $ext: {
    hasAddAction: true,
    hasDeleteAction: true,
    hasEditAction: true,
    hasAuditAction: true,
    rowExpandable: true
  }
};
