import {Attendance, CommissionRates, Fruit, FruitCompute, StaffPosition} from '@uranplus/cavalry-define';
import * as moment from 'moment';

declare var require: any;
const debug = require('debug')('cavalry-sdk/staff-fruit');

export class StaffFruit extends Fruit implements FruitCompute {
  async init(
    staffPosition: StaffPosition,
    attendance: Attendance,
    commissionRates: CommissionRates,
    minMonthlySalary: number,
    resumeCost: number = 0
  ) {
    super.init(staffPosition, attendance, commissionRates, minMonthlySalary, resumeCost);
    // const commissionRate = await getTeamCommissionRates(
    //     staffPosition.manager,
    //     staffPosition.team,
    //     this.month
    // )
    // this.minMonthlySalary = await this.getMinMonthlySalary(staffPosition)
    this.managementDailyCost = staffPosition.dept === '派遣部' ? 155 : 145;
  }
  // setAchievements(achievements: Achievement[]) {
  //     this.achievements = achievements
  // }
  // setKpiPayments(kpiPayments: KpiPayment[]) {
  //     this.kpiPayments = kpiPayments
  // }

  getIncoming() {
    let achievementsSum = this.achievements.reduce((pre, achievement) => {
      return pre + achievement.value;
    }, 0);
    debug('StaffFruit.getIncoming() achievementsSum=', achievementsSum);
    return achievementsSum;
  }
  getRecall() {
    let recruitmentRecallsSum = this.recruitmentRecalls.reduce((pre, recruitmentRecall) => {
      return pre + recruitmentRecall.value;
    }, 0);
    debug('StaffFruit.getRecall() recruitmentRecallsSum=', recruitmentRecallsSum);
    return recruitmentRecallsSum;
  }
  getCost() {
    // this.resumeCost = this.dailyPersonalResumeCosts.reduce((pre, resumeCost) => pre + resumeCost.value, 0);
    return (
      this.teamDailyCost * this.attendance.should + this.managementDailyCost * this.attendance.should + this.resumeCost
    );
  }
  getMinSalary() {
    return (this.minMonthlySalary * this.attendance.acture) / moment(this.start).daysInMonth();
  }
}
