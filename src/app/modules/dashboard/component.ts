import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Employee} from '@employee';
import {ApiUtils, BaseComponent} from '@er/core';
import {defaultOrderedRowIndexColumn, PngTableColumnProps, PngTableProps} from '@er/primeng';
import {
  AggInterval,
  AggMethods,
  AggProps,
  ApiDataProps,
  ChartDimension,
  ChartProps,
  ChartType,
  DataAttr
} from '@er/types';
import * as esb from 'elastic-builder';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Employer} from '../dispatch/fields/employer';
import {Enroll} from '../dispatch/fields/enroll';

@Component({
  templateUrl: 'tpl.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent extends BaseComponent implements OnInit {

  stat$: Observable<{}> = new Observable<{}>(undefined);

  boards = {};

  ngOnInit(): void {

    const counts = [
      // {
      //   apiEntry: ORG.apiEntry,
      //   aggProps: {name: 'dept', field: Dept.fields.deptId.key, method: AggMethods.COUNT}
      // },
      // {
      //   apiEntry: Team.apiEntry,
      //   aggProps: {name: 'team', field: Team.fields.teamId.key, method: AggMethods.COUNT}
      // },
      {
        apiEntry: Employee.apiEntry,
        aggProps: {name: 'employee', field: Employee.fields.empId.key, method: AggMethods.COUNT}
      },
      {
        apiEntry: Employer.apiEntry,
        aggProps: {name: 'employer', field: Employer.fields.name.key, method: AggMethods.COUNT}
      },
      {
        apiEntry: Enroll.apiEntry,
        aggProps: {name: 'dispatch', field: `${Enroll.fields.staff.key}.name`, method: AggMethods.COUNT}
      },
      // {
      //   apiEntry: Salary.apiEntry,
      //   aggProps: {name: 'salary', field: Salary.fields.salary.key, method: AggMethods.SUM}
      // },
      {
        apiEntry: Enroll.apiEntry,
        aggProps: [
          {
            interval: AggInterval.MONTH,
            aggs: (aggProps) => {
              return esb.dateHistogramAggregation('month-count', `${Enroll.fields.bizDate.key}`, aggProps.interval)
                .format('yyyy年MM月').minDocCount(aggProps.minCount || 1).agg(esb.dateHistogramAggregation('sub', 'bizDate', '1d').minDocCount(aggProps.minCount || 1).format('yyyy-MM-dd'));
            }
          },
          {aggs: esb.dateHistogramAggregation('year-count', `${Enroll.fields.bizDate.key}`, '1y').format('yyyy年')}
        ]
      }
    ];

    this.boards['daysEnroll'] = <ChartProps> {
      type: ChartType.BAR,
      switchable: true,
      caption: '上月入职统计',
      captionIcon: '',
      dataSource: {
        apiEntry: Enroll.apiEntry,
        query: esb.rangeQuery(`${Enroll.fields.bizDate.key}`).gte('now-1M/M').lte('now-1M/M'),
        aggProps: {
          name: 'daysEnroll',
          field: `${Enroll.fields.bizDate.key}`,
          method: AggMethods.DATE_HISTOGRAM,
          interval: AggInterval.DAY
        }
      },
      dimensions: {
        title: '入职人数分布',
        dataSrcPath: 'daysEnroll'
      }
    };

    this.boards['topEnroll'] = <ChartProps> {
      type: ChartType.BAR,
      switchable: false,
      caption: '月最高入职小组',
      captionIcon: '',
      dataSource: <ApiDataProps>{
        apiEntry: Enroll.apiEntry,
        query: esb.rangeQuery(`${Enroll.fields.bizDate.key}`).gte('now-1M/M').lte('now-1M/M'),
        aggProps: <AggProps>{
          minCount: 1,
          aggs: esb.termsAggregation('groups', 'team.name').size(10).order('_count', 'desc')
        }
      },
      dimensions: <ChartDimension[]>[
        {
          title: '最高月入职小组',
          dataSrcPath: 'groups'
        }
      ]
    };

    this.boards['bottomEnroll'] = <ChartProps> {
      type: ChartType.BAR,
      switchable: false,
      caption: '月最高入职小组',
      captionIcon: '',
      dataSource: <ApiDataProps>{
        apiEntry: Enroll.apiEntry,
        query: esb.rangeQuery(`${Enroll.fields.bizDate.key}`).gte('now-1M/M').lte('now-1M/M'),
        aggProps: <AggProps>{
          minCount: 1,
          aggs: esb.termsAggregation('groups', 'team.name').size(10).order('_count', 'asc')
        }
      },
      dimensions: <ChartDimension[]>[
        {
          title: '最高月入职小组',
          dataSrcPath: 'groups'
        }
      ]
    };

    this.boards['staff'] = <PngTableProps> {
      entity: Enroll,
      caption: '最多入职企业人数',
      paginator: false,
      columns: <PngTableColumnProps[]>[
        {
          key: 'label',
          label: '派遣单位'
        },
        {
          key: 'value',
          label: '入职人数',
          dataAttr: DataAttr.TAG
        }
      ],
      $ext: {
        apiDataProps: {
          query: esb.rangeQuery(`${Enroll.fields.bizDate.key}`).gte('now-1M/M').lte('now-1M/M'),
          aggProps: <AggProps>{
            aggs: esb.termsAggregation('groups', 'team.name').size(10).order('_count', 'desc')
          },
          dataPath: 'aggs.groups'
        }
      }
    };

    this.boards['employee'] = <PngTableProps> {
      caption: '最多入职员工人数',
      paginator: false,
      columns: <PngTableColumnProps[]>[
        {
          ...defaultOrderedRowIndexColumn,
          label: '名次'
        },
        {
          key: 'label',
          label: '派遣单位'
        },
        {
          key: 'value',
          label: '入职人数',
          dataAttr: DataAttr.TAG
        }
      ],
      $ext: {
        apiDataProps: {
          apiEntry: Enroll.apiEntry,
          query: esb.rangeQuery(`${Enroll.fields.bizDate.key}`).gte('now-1M/M').lte('now-1M/M'),
          aggProps: <AggProps>{
            aggs: esb.termsAggregation('emps', 'emp.name').size(10).order('_count', 'desc')
          },
          dataPath: 'aggs.emps'
        }
      }
    };

    this.stat$ = ApiUtils.batchFetch(counts)
      .pipe(
        map((data) => data)// CommonsUtils.arrayToJson(data))
      );
  }
}
