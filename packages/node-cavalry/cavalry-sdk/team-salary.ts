import {
  Achievement,
  BaseDataServiceInterface,
  CommissionRates,
  Fruit,
  Recruitment,
  RecruitmentRecall,
  StaffPosition
} from '@uranplus/cavalry-define';
import {TeamFruit, visitFruitTree} from './team-fruit';

import {GroupFruit} from './group-fruit';
import {StaffFruit} from './staff-fruit';
import {getLeader} from './common/utils';
import * as moment from 'moment';
import {assert} from 'chai';

import {flatTeamFruits} from './flat-team-fruits';
import {searchStaffFruits} from './search-fruit';

const debug = require('debug')('cavalry-sdk/team-salary');

let gBaseDataService: BaseDataServiceInterface;

export async function changeCommissionRates(commissionRates: CommissionRates) {
  let df = getTeamFruitTree(
    await gBaseDataService.getTeamFruits(commissionRates.team, commissionRates.manager, commissionRates.month)
  );
  await visitFruitTree(df, (fruit: Fruit) => {
    if (fruit.employee === fruit.staffPosition.manager) {
      fruit.commissionRate = commissionRates.managerRate;
    } else if (fruit.employee === fruit.staffPosition.groupLeader) {
      fruit.commissionRate = commissionRates.groupleaderRate;
    } else {
      fruit.commissionRate = commissionRates.staffRate;
    }
  });
  df.run();
  let entries: Fruit[] = [];
  await visitFruitTree([df], (fruit: Fruit) => {
    entries.push(fruit.cloneFruit());
  });
  return entries;
}

export function getTeamFruitTree(entries: Fruit[]) {
  let df = getTeamFruit(entries);
  df.staffFruits = getTeamStaffFruits(entries);
  df.groupFruits = getGroupFruits(entries);
  return df;
}
function getTeamFruit(entries: Fruit[]): TeamFruit {
  let teamFruit = new TeamFruit();
  return Object.assign(
    teamFruit,
    entries.find(entry => {
      if (entry.staffPosition.manager === entry.employee) {
        return true;
      }
    })
  );
}

function getTeamStaffFruits(entries: Fruit[]): StaffFruit[] {
  return entries
    .filter(entry => {
      if (entry.staffPosition.manager !== entry.employee && entry.staffPosition.groupLeader == null) {
        return true;
      }
    })
    .map(entry => Object.assign(new StaffFruit(), entry));
}

function getGroupFruits(entries: Fruit[]): GroupFruit[] {
  return entries
    .filter(entry => {
      if (
        entry.staffPosition.manager !== entry.employee &&
        entry.staffPosition.groupLeader != null &&
        entry.staffPosition.groupLeader === entry.employee
      ) {
        return true;
      }
    })
    .map(entry => getGroupFruitTree(entries, entry));
}

function getGroupFruitTree(entries: Fruit[], groupEntry: Fruit): GroupFruit {
  let gf = Object.assign(new GroupFruit(), groupEntry);
  gf.staffFruits = getGroupStaffFruits(entries, gf.employee);
  return gf;
}

function getGroupStaffFruits(entries: Fruit[], groupLeader: string): StaffFruit[] {
  return entries
    .filter(entry => {
      if (
        entry.staffPosition.manager !== entry.employee &&
        entry.employee !== groupLeader &&
        entry.staffPosition.groupLeader == groupLeader
      ) {
        return true;
      }
    })
    .map(entry => Object.assign(new StaffFruit(), entry));
}

export function getBaseDataService() {
  return gBaseDataService;
}

async function initTeamFruits(monthStr: string, baseDataService: BaseDataServiceInterface): Promise<TeamFruit[]> {
  const month = moment(monthStr);
  const start = month.startOf('month').format('YYYY-MM-DD');
  const end = month
    .add(1, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  gBaseDataService = baseDataService;
  let teamFruits: TeamFruit[] = [];
  let curTeamFruit: TeamFruit;
  let curGroupFruit: GroupFruit;

  await gBaseDataService.visitStaffPositions(start, end, async (staffPosition: StaffPosition) => {
    const attendance = await gBaseDataService.getAttendanceByStaffPosition(staffPosition);

    const commissionRates = await gBaseDataService.getTeamCommissionRates(
      staffPosition.team,
      staffPosition.manager,
      start
    );
    const minMonthlySalary = await gBaseDataService.getMinMonthlySalary(staffPosition, start);
    const userResumeCost = (await gBaseDataService.getUserResumeCost(
      staffPosition.name,
      staffPosition.start,
      staffPosition.end
    )).amount;
    if (staffPosition.name && staffPosition.start < staffPosition.end) {
      if (staffPosition.name === staffPosition.manager) {
        curTeamFruit = new TeamFruit();
        await curTeamFruit.init(staffPosition, attendance, commissionRates, minMonthlySalary, userResumeCost);
        teamFruits.push(curTeamFruit);
      } else if (!staffPosition.groupLeader) {
        let sf = new StaffFruit();
        await sf.init(staffPosition, attendance, commissionRates, minMonthlySalary, userResumeCost);
        curTeamFruit.addStaffFruit(sf);
      } else if (staffPosition.groupLeader === staffPosition.name) {
        curGroupFruit = new GroupFruit();
        await curGroupFruit.init(staffPosition, attendance, commissionRates, minMonthlySalary, userResumeCost);
        curTeamFruit.addGroupFruit(curGroupFruit);
      } else {
        let sf = new StaffFruit();
        await sf.init(staffPosition, attendance, commissionRates, minMonthlySalary, userResumeCost);
        curGroupFruit.addStaffFruit(sf);
      }
    }
  });
  return teamFruits;
}

function findStaffFruitByDate(employeeFruitMap: Map<string, StaffFruit[]>, name: string, date: string) {
  if (employeeFruitMap.has(name)) {
    return employeeFruitMap
      .get(name)
      .find(
        (fruit: Fruit) =>
          moment(date).isSameOrAfter(fruit.staffPosition.start) && moment(date).isBefore(fruit.staffPosition.end)
      );
  } else {
    console.warn('findStaffFruitByDate() failed, name=', name, ', date=', date);
    return null;
  }
}

async function getTeamFruits(teamFruits: TeamFruit[], monthStr: string): Promise<TeamFruit[]> {
  const month = moment(monthStr);
  const start = month.startOf('month').format('YYYY-MM-DD');
  const end = month
    .add(1, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const achievements: Achievement[] = await gBaseDataService.getAchievements(start);
  const teamProfitCosts = await gBaseDataService.getTeamProfitCosts(start);
  const recalls = await gBaseDataService.getRecruitmentRecalls(start, end);
  const kpiPayments = await gBaseDataService.getAllKpiPayments(start);

  const fruitMap = await flatTeamFruits(teamFruits);

  for (let achievement of achievements) {
    let staffFruit: StaffFruit = await findStaffFruitByDate(fruitMap, achievement.employee, achievement.date);

    if (!staffFruit) {
      continue;
    }
    if (staffFruit.staffPosition.teamCode !== achievement.teamCode) {
      console.warn(
        'import achievements warning, staffFruit.staffPosition.teamCode=',
        staffFruit.staffPosition.teamCode,
        ', achievement.teamCode=',
        achievement.teamCode
      );
    }
    staffFruit.achievements.push(achievement);
  }

  for (let teamProfitCost of teamProfitCosts) {
    let days = 1;
    let staffPosition = new StaffPosition();
    staffPosition.name = teamProfitCost.manager;
    staffPosition.manager = teamProfitCost.manager;
    staffPosition.team = teamProfitCost.team;
    staffPosition.start = null;
    staffPosition.end = null;
    let staffFruits: any[] = await searchStaffFruits(teamFruits, staffPosition, ['name', 'team', 'manager']);
    if (staffFruits.length >= 2) {
      console.warn('getTeamFruits() import teamProfitCost, warn found more than one staffFruit, use last one');
    }
    if (staffFruits.length === 0) {
      console.error('getTeamFruits() import teamProfitCost() failed, staffPosition =', JSON.stringify(staffPosition));
    } else {
      staffFruits[0].incoming = teamProfitCost.incoming;
      staffFruits[0].commonCost = teamProfitCost.commonCost;
      staffFruits[0].teamCost = teamProfitCost.teamCost;
      // 部门均摊成本（每人每天）
      let totalAttendance = 0;
      await visitFruitTree(staffFruits[0], async staffFruit => {
        if (staffFruit.staffPosition.manager !== staffFruit.staffPosition.name) {
          totalAttendance = totalAttendance + staffFruit.attendance.should;
        }
      });
      const teamDailyCost = teamProfitCost.teamCost / totalAttendance;
      debug(
        'getTeamFruits() staffFruit.teamDailyCost=',
        teamDailyCost,
        ' teamProfitCost.teamCost=',
        teamProfitCost.teamCost,
        ' totalAttendance=',
        totalAttendance
      );
      await visitFruitTree(staffFruits[0], async staffFruit => {
        staffFruit.teamDailyCost = teamDailyCost;
      });
    }
  }

  for (let recruitmentRecall of recalls) {
    fillRecruitmentRecall(recruitmentRecall, fruitMap);
  }

  for (let kpiPayment of kpiPayments) {
    let staffFruit: StaffFruit = await findStaffFruitByDate(fruitMap, kpiPayment.employee, kpiPayment.date);
    debug('kpiPayment=', kpiPayment, ' staffFruit', staffFruit);
    if (!staffFruit) {
      continue;
    }
    if (staffFruit.staffPosition.teamCode !== kpiPayment.teamCode) {
      console.warn(
        'import kpiPayment warning, staffFruit.staffPosition.teamCode=',
        staffFruit.staffPosition.teamCode,
        ', kpiPayment.teamCode=',
        kpiPayment.teamCode
      );
    }
    staffFruit.kpiPayments.push(kpiPayment);
  }

  teamFruits.forEach(teamFruit => teamFruit.run());
  return teamFruits;
}

function fillRecruitmentRecall(recruitmentRecall: RecruitmentRecall, fruitMap: Map<string, StaffFruit[]>) {
  if (fruitMap.has(recruitmentRecall.employee)) {
    fruitMap.get(recruitmentRecall.employee)[0].recruitmentRecalls.push(recruitmentRecall);
  } else {
    console.error('fillRecruitmentRecall() error, recruitmentRecall=', recruitmentRecall, ', the employee not found');
  }
  if (recruitmentRecall.leader && fruitMap.has(recruitmentRecall.leader)) {
    fruitMap.get(recruitmentRecall.leader)[0].recruitmentRecalls.push(recruitmentRecall);
  } else {
    console.error('fillRecruitmentRecall() error, recruitmentRecall=', recruitmentRecall, ', the leader not found');
  }
}

// deplicated function
async function _fillRecruitmentRecall(monthStr, fruitMap, recruitmentRecall, achievements) {
  const staff: StaffPosition = await fillRecruitmentRecalls2Fruit(
    monthStr,
    fruitMap.get(recruitmentRecall.employee),
    recruitmentRecall,
    achievements
  );
  if (staff) {
    const leader = getLeader(staff);
    if (leader) {
      if (leader === recruitmentRecall.manager) {
        await fillRecruitmentRecalls2Fruit(
          monthStr,
          fruitMap.get(recruitmentRecall.manager),
          recruitmentRecall,
          achievements
        );
      } else {
        await fillRecruitmentRecalls2Fruit(
          monthStr,
          fruitMap.get(recruitmentRecall.manager),
          recruitmentRecall,
          achievements
        );
        await fillRecruitmentRecalls2Fruit(monthStr, fruitMap.get(leader), recruitmentRecall, achievements);
      }
    }
  }
}

async function fillRecruitmentRecalls2Fruit(
  month: string,
  fruits: Fruit[],
  recruitmentRecall: RecruitmentRecall,
  achievements: Recruitment[]
): Promise<StaffPosition> {
  const start = moment(month)
    .subtract(1, 'months')
    .format('YYYY-MM-DD');
  const recruitment = achievements.find((recruitment: Recruitment) => {
    if (recruitment.jobSeeker) {
      return (
        recruitmentRecall.jobSeeker.name === recruitment.jobSeeker.name &&
        recruitmentRecall.jobSeeker.phoneNumber === recruitment.jobSeeker.phoneNumber
      );
    } else {
      return false;
    }
  });
  if (fruits && recruitment) {
    const temp1 = fruits.find((fruit: Fruit) => {
      return (
        fruit.staffPosition.team === recruitment.team &&
        fruit.staffPosition.manager === recruitment.manager &&
        getLeader(fruit.staffPosition) === recruitment.leader
      );
    });
    const temp2 = fruits.find((fruit: Fruit) => {
      return fruit.staffPosition.team === recruitment.team && fruit.staffPosition.manager === recruitment.manager;
    });
    const temp3 = fruits.find((fruit: Fruit) => {
      return fruit.staffPosition.team === recruitment.team;
    });
    if (temp1) {
      temp1.recruitmentRecalls.push(recruitmentRecall);
      return temp1.staffPosition;
    } else if (temp2) {
      temp2.recruitmentRecalls.push(recruitmentRecall);
      return temp2.staffPosition;
    } else if (temp3) {
      temp3.recruitmentRecalls.push(recruitmentRecall);
      return temp3.staffPosition;
    } else {
      fruits[0].recruitmentRecalls.push(recruitmentRecall);
      return fruits[0].staffPosition;
    }
  } else {
    return null;
  }
}

export async function getFruitEntities(month: string, baseDataService: BaseDataServiceInterface) {
  const entries: Fruit[] = [];
  const teamFruits = await initTeamFruits(month, baseDataService);
  debug('getFruitEntities() teamFruits=', teamFruits);
  await getTeamFruits(teamFruits, month);
  await visitFruitTree(teamFruits, (fruit: Fruit) => {
    entries.push(fruit.cloneFruit());
  });
  return entries;
}
