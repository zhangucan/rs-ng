import {ChangeDetectionStrategy, Component, OnChanges, OnInit} from '@angular/core';
import {BaseComponent} from '@er/core';
import {getFruitEntities} from '@uranplus/cavalry-sdk';
import {BaseDataService} from '../../../commons/converter/server';
import {Salary} from '../../../fields/salary';
import {saveJsonToDb} from 'src/app/modules/commons/api-utils-extend';
import * as _ from 'lodash';
import {DateUtils} from '@er/utils';

const debug = require('debug')('page/salary-employees');

@Component({
  selector: 'app-caption-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionComponent extends BaseComponent implements OnChanges, OnInit {
  baseDataService: BaseDataService;
  month: string;
  ngOnInit() {
    this.month = '2018-11-01';
    this.baseDataService = new BaseDataService('001');
    // 派遣部
    // this.baseDataService = new BaseDataService('001001015');

    // this.baseDataService = new BaseDataService('001001011');
    // this.baseDataService = new BaseDataService('001001015020');
    // this.baseDataService = new BaseDataService('001001015047');
  }
  async handleClick() {
    await this.baseDataService.deleteTeamFruits(this.month);
    const fruits = await getFruitEntities(this.month, this.baseDataService);
    debug('fruits=', fruits);
    fruits.forEach(fruit => {
      for (const key in fruit) {
        if (typeof fruit[key] === 'number') {
          fruit[key] = Math.round(fruit[key] * 100) / 100.0;
        }
      }
      // fruit.staffPosition = undefined;
      // delete fruit.recruitmentRecalls;
      // delete fruit.achievements;
      // delete fruit.kpiPayments;
      // delete fruit.dailyPersonalResumeCosts;
      fruit['createdDate'] = DateUtils.getFormattedDate(null, 'YYYY-MM-DD HH:mm:ss');
    });
    await saveJsonToDb(fruits, Salary.apiEntry);
  }

  async allClick() {
    await this.baseDataService.deleteFinalFruits(this.month);

    const allelm = await this.baseDataService.getAllSalaryNumber(this.month);
    const a = _.groupBy(allelm.items, 'employee');
    console.log('a=', a);
    const keys = _.keys(a);
    let finalWageData = [];

    keys.map(item => {
      let b = {};
      b['month'] = '2018-11-01';
      b['name'] = a[item][0].employee;
      b['empId'] = a[item][0].staffPosition.employeeId;
      let itemArray = ['salary', 'incoming', 'cost', 'commission', 'loss', 'profit', 'deductionInCash'];
      itemArray.map(hero => {
        b[hero] = +_.reduce(
          a[item],
          function(sum, n) {
            return sum + n[hero];
          },
          0
        ).toFixed(2);
      });
      b['acture'] = _.reduce(
        a[item],
        function(sum, n) {
          return sum + n.attendance.acture;
        },
        0
      );
      b['should'] = _.reduce(
        a[item],
        function(sum, n) {
          return sum + n.attendance.should;
        },
        0
      );
      let itemCodes = ['corp', 'dept', 'team'];
      itemCodes.map(code => {
        b[code] = [];
        a[item].map(staffPos => {
          b[code].push(staffPos[code]);
        });
      });

      // b['achievements'] = [];
      // a[item].map(staffPos => {
      //   if (staffPos['achievements'].length > 0) {
      //     staffPos['achievements'].map(achieve => {
      //       b['achievements'].push(achieve);
      //     });
      //   }
      // });
      finalWageData.push(b);
    });

    console.log('finalWageData=', finalWageData);

    await saveJsonToDb(finalWageData, 'salary-monthly');
  }
}
