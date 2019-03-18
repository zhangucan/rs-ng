import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '@er/core';
import {PngAutoCompleteProps, PngChartComponent, PngSelectProps} from '@er/primeng';
import {AggIntervalProps, ChartProps} from '@er/types';
import {BehaviorSubject} from 'rxjs';
import {orgSelector} from '../../../dropdown/org';

@Component({
  selector: 'chart-panel',
  template: `
    <png-chart erPropsBind [props]="chartProps$|async">
      <ng-template erTypedTemplate="header">
        <png-select class="pull-right" erPropsBind [props]="intervalSelectProp" [(ngModel)]="aggInterval"></png-select>
        <png-auto-complete class="pull-right" erPropsBind [props]="querySelectProp"
                           [(ngModel)]="queryValue"></png-auto-complete>
      </ng-template>
    </png-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartPanelComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() intervalSelectProp: {};

  @Input() querySelectProp: {};

  @ViewChild(PngChartComponent) pngChart: PngChartComponent;

  queryValue: string;

  aggInterval = AggIntervalProps.day;

  chartProps$: BehaviorSubject<ChartProps> = new BehaviorSubject<ChartProps>(undefined);

  private _chartProps: ChartProps;

  get chartProps() {
    return this._chartProps;
  }

  @Input()
  set chartProps(props) {
    this._chartProps = props;
    this._chartProps.resolveDataSource = {method: this.resolveDataSource.bind(this)};
    this._chartProps.resolveDimension = {method: this.resolveDimension.bind(this)};
    this.chartProps$.next(this._chartProps);
  }

  ngOnInit() {
    if (!this.intervalSelectProp) {
      this.intervalSelectProp = {};
      const intervals = [];
      Object.keys(AggIntervalProps).forEach(key => {
        intervals.push({
          label: AggIntervalProps[key]['label'],
          value: AggIntervalProps[key]
        });
      });
      this.intervalSelectProp = <PngSelectProps>{
        onChange: this.refreshChart.bind(this),
        placeholder: '统计周期选择',
        $ext: {
          dataItems: intervals,
          dataItemProps: {
            valueKey: 'value'
          }
        }
      };
    }
    if (!this.querySelectProp) {
      this.querySelectProp = <PngAutoCompleteProps>{
        ...orgSelector,
        onSelect: this.refreshChart.bind(this),
        placeholder: '聚焦所属组织'
      };
    }
  }

  refreshChart() {
    this.pngChart.reBuildChart();
  }

  resolveDataSource(ds) {
    if (this.aggInterval) {
      ds['interval'] = this.aggInterval['key'];
      ds['format'] = this.aggInterval['format'];
    }
    if (this.queryValue) {
      ds['queryValue'] = this.queryValue['code'];
    }
    return ds;
  }

  resolveDimension(dimension) {
    if (this.aggInterval) {
      const fixSuffix = '-- 按 【';
      let title: string = dimension.title;
      const i = title.indexOf(fixSuffix);
      if (i > 0) {
        title = title.substr(0, i);
      }
      dimension.title = title + fixSuffix + this.aggInterval['label'] + ' 】';
    }
    return dimension;
  }
}
