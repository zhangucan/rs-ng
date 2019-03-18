import {GroupFruit} from './group-fruit';
import {StaffFruit} from './staff-fruit';
import {
  Achievement,
  AchievementType,
  Attendance,
  CommissionRates,
  Fruit,
  FruitCompute,
  Recruitment,
  StaffPosition
} from '@uranplus/cavalry-define';

const debug = require('debug')('cavalry-sdk/team-fruit');

export class TeamFruit extends StaffFruit implements FruitCompute {
  staffFruits?: StaffFruit[] = [];
  groupFruits?: GroupFruit[] = [];
  commonCost?: number = 0;
  teamCost?: number = 0;
  staffSalary?: number = 0;
  staffLaborCost?: number = 0;
  teamResumeCost?: number = 0;
  async init(
    staffPosition: StaffPosition,
    attendance: Attendance,
    commissionRates: CommissionRates,
    minMonthlySalary: number,
    userResumeCost: number = 0
  ) {
    super.init(staffPosition, attendance, commissionRates, minMonthlySalary, userResumeCost);
    this.commissionRate = commissionRates == null ? 0.3 : commissionRates.managerRate;
  }
  run() {
    this.staffFruits.forEach(staffFruit => staffFruit.run());
    this.groupFruits.forEach(groupFruit => groupFruit.run());
    this.staffSalary = this.getStaffSalary();
    this.staffLaborCost = this.getStaffLaborCost();
    super.run();

    this.teamResumeCost =
      this.staffFruits.reduce((pre, staffFruit) => {
        return pre + staffFruit.resumeCost;
      }, 0) +
      this.groupFruits.reduce((pre, groupFruit) => {
        return pre + groupFruit.groupResumeCost;
      }, 0) +
      this.resumeCost;
  }
  addStaffFruit(staffFruit: StaffFruit) {
    this.staffFruits.push(staffFruit);
  }
  addGroupFruit(groupFruit: GroupFruit) {
    this.groupFruits.push(groupFruit);
  }
  inputAchievement(achievement: Achievement) {
    if (achievement.type === AchievementType.RECRUITMENT) {
      let recruitment: Recruitment = achievement;
    }
  }
  getIncoming() {
    return this.incoming;
  }
  getStaffSalary() {
    return (
      this.staffFruits.reduce((pre, staffFruit) => {
        return pre + staffFruit.salary;
      }, 0) +
      this.groupFruits.reduce((pre, groupFruit) => {
        return (
          pre +
          groupFruit.salary +
          groupFruit.staffFruits.reduce((pre, staffFruit) => {
            return pre + staffFruit.salary;
          }, 0)
        );
      }, 0)
    );
  }
  getStaffLaborCost() {
    return (
      this.staffFruits.reduce((pre, staffFruit) => {
        return pre + staffFruit.laborCost;
      }, 0) +
      this.groupFruits.reduce((pre, groupFruit) => {
        return pre + groupFruit.laborCost;
      }, 0)
    );
  }

  getCost() {
    // this.resumeCost = this.dailyPersonalResumeCosts.reduce((pre, resumeCost) => pre + resumeCost.value, 0);
    return this.getStaffSalary() + this.commonCost + this.teamCost;
  }
  // getMinSalary() {
  //   return 0;
  // }
  cloneFruit() {
    let cloneObj = new Fruit().cloneFruit.apply(this);

    if (this.commonCost && this.teamCost) {
      cloneObj['commonCost'] = this.commonCost;
      cloneObj['teamCost'] = this.teamCost;
      cloneObj['staffSalary'] = this.staffSalary;
      cloneObj['staffLaborCost'] = this.staffLaborCost;
      cloneObj['teamResumeCost'] = this.teamResumeCost;
    }
    return cloneObj;
  }
}

export async function visitFruitTree(tree, callback) {
  if (tree instanceof Array) {
    for (let item of tree) {
      await visitFruitTree(item, callback);
    }
  } else if (tree instanceof Fruit) {
    await callback(tree);
    if (tree['staffFruits']) {
      await visitFruitTree(tree['staffFruits'], callback);
    }
    if (tree['groupFruits']) {
      await visitFruitTree(tree['groupFruits'], callback);
    }
  }
}
