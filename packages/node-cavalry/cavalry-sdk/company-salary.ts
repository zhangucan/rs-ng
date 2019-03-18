import {
  BaseDataServiceInterface,
  Fruit,
  JobStatus,
  NodeSlice,
  Recruitment,
  RecruitmentRecall,
  StaffPosition,
} from '@uranplus/cavalry-define';
import {TeamFruit} from './team-fruit';
import {GroupFruit} from './group-fruit';
import {StaffFruit} from './staff-fruit';
import {
  chopNodeSlice,
  filterSortedTimeRangesByTime,
  getStaffPositionMap,
  initTreeLife,
  phraseMap,
  validateNodeSlices,
  visitTree,
} from './tree-life';
import {getLeader} from './common/utils';
import * as moment from 'moment';

import {findStaffFruit, searchStaffFruits} from './search-fruit';

import {flatTeamFruits} from './flat-team-fruits';

let fruitMap: Map<string, Fruit[]>;
let gBaseDataService: BaseDataServiceInterface;

export function getBaseDataService() {
  return gBaseDataService;
}

export async function initTeamFruits(
  monthStr: string,
  baseDataService: BaseDataServiceInterface
): Promise<TeamFruit[]> {
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

  initTreeLife(start, gBaseDataService);
  let staffPositionMap = await getStaffPositionMap();
  for (let entry of staffPositionMap.entries()) {
    let filteredStaffPositions = filterSortedTimeRangesByTime(entry[1], start, end);
    if (validateNodeSlices(filteredStaffPositions)) {
      let isLeaved = false;
      for (let i = filteredStaffPositions.length - 1; i >= 0; i--) {
        let staffPosition: StaffPosition = filteredStaffPositions[i];
        if (!!staffPosition.nodeSlice) {
          staffPosition.nodeSlice.isValid = true;
          if (staffPosition.status === JobStatus.LEAVE) {
            isLeaved = true;
          }
          if (isLeaved) {
            staffPosition.status = JobStatus.LEAVE;
          }
        } else {
          console.error('initTeamFruits() error: staffPosition.nodeSlice not found, staffPosition=', staffPosition);
        }
      }
    } else {
      console.error(
        'initTeamFruits() error: validateNodeSlices() failed, filteredStaffPositions=',
        filteredStaffPositions
      );
    }
  }

  await visitTree(async (staffPosition: StaffPosition, nodeSlice: NodeSlice) => {
    if (nodeSlice.isValid) {
      chopNodeSlice(staffPosition, start, end);
      const attendance = await gBaseDataService.getAttendanceByStaffPosition(staffPosition);
      const commissionRates = await gBaseDataService.getTeamCommissionRates(
        staffPosition.team,
        staffPosition.manager,
        start
      );
      const minMonthlySalary = await gBaseDataService.getMinMonthlySalary(staffPosition, start);
      if (staffPosition.name && staffPosition.start < staffPosition.end) {
        if (staffPosition.name === staffPosition.manager) {
          curTeamFruit = new TeamFruit();
          await curTeamFruit.init(staffPosition, attendance, commissionRates, minMonthlySalary);
          teamFruits.push(curTeamFruit);
        } else if (!staffPosition.groupLeader) {
          let sf = new StaffFruit();
          await sf.init(staffPosition, attendance, commissionRates, minMonthlySalary);
          curTeamFruit.addStaffFruit(sf);
        } else if (staffPosition.groupLeader === staffPosition.name) {
          curGroupFruit = new GroupFruit();
          await curGroupFruit.init(staffPosition, attendance, commissionRates, minMonthlySalary);
          curTeamFruit.addGroupFruit(curGroupFruit);
        } else {
          let sf = new StaffFruit();
          await sf.init(staffPosition, attendance, commissionRates, minMonthlySalary);
          curGroupFruit.addStaffFruit(sf);
        }
      }
    }
  });
  fruitMap = await flatTeamFruits(teamFruits);
  return teamFruits;
}

export async function getTeamFruits(teamFruits: TeamFruit[], monthStr: string): Promise<TeamFruit[]> {
  const month = moment(monthStr);
  const start = month.startOf('month').format('YYYY-MM-DD');
  const end = month
    .add(1, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const achievements = await gBaseDataService.getAchievements(start);
  const teamProfitCosts = await gBaseDataService.getTeamProfitCosts(start);
  const recalls = await gBaseDataService.getRecruitmentRecalls(start);
  const kpiPayments = await gBaseDataService.getAllKpiPayments(start);
  for (let achievement of achievements) {
    let staffPosition = new StaffPosition();
    staffPosition.name = achievement.employee;
    staffPosition.team = phraseMap(achievement.team);
    staffPosition.manager = achievement.manager;
    staffPosition.groupLeader = achievement.manager === achievement.leader ? null : achievement.leader;
    staffPosition.start = moment(achievement.date).format('YYYY-MM-DD');
    staffPosition.end = moment(achievement.date)
      .add(1, 'day')
      .format('YYYY-MM-DD');

    let staffFruit: StaffFruit = await findStaffFruit(teamFruits, staffPosition);
    if (!staffFruit) {
      continue;
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
    let staffFruits2: any[] = await searchStaffFruits(teamFruits, staffPosition, ['team']);
    if (staffFruits.length >= 2) {
      console.warn('getTeamFruits() import teamProfitCost, warn found more than one staffFruit, use last one');
    }
    if (staffFruits.length === 0) {
      console.error('getTeamFruits() import teamProfitCost() failed, staffPosition =', JSON.stringify(staffPosition));
    } else {
      staffFruits[0].incoming = teamProfitCost.incoming;
      staffFruits[0].commonCost = teamProfitCost.commonCost;
      staffFruits[0].teamCost = teamProfitCost.teamCost;
    }
    // 部门均摊成本（每人每天）
    days = staffFruits2.reduce((total, item) => {
      if (item.staffPosition.manager === item.staffPosition.name) {
        return total;
      }
      return total + item.attendance.should;
    }, 0);
    staffFruits2.forEach(staffFruit => (staffFruit.teamDailyCost = teamProfitCost.teamCost / days));
  }
  for (let recruitmentRecall of recalls) {
    const staff: StaffPosition = await fillRecruitmentRecalls2Fruits(
      monthStr,
      fruitMap.get(recruitmentRecall.employee),
      recruitmentRecall,
      achievements
    );
    if (staff) {
      const leader = getLeader(staff);
      if (leader) {
        if (leader === recruitmentRecall.manager) {
          await fillRecruitmentRecalls2Fruits(
            monthStr,
            fruitMap.get(recruitmentRecall.manager),
            recruitmentRecall,
            achievements
          );
        } else {
          await fillRecruitmentRecalls2Fruits(
            monthStr,
            fruitMap.get(recruitmentRecall.manager),
            recruitmentRecall,
            achievements
          );
          await fillRecruitmentRecalls2Fruits(monthStr, fruitMap.get(leader), recruitmentRecall, achievements);
        }
      }
    }
  }

  for (let kpiPayment of kpiPayments) {
    let staffPosition = new StaffPosition();
    staffPosition.name = kpiPayment.employee;
    staffPosition.start = moment(kpiPayment.date).format('YYYY-MM-DD');
    staffPosition.end = moment(kpiPayment.date)
      .add(1, 'day')
      .format('YYYY-MM-DD');

    let staffFruits = await searchStaffFruits(teamFruits, staffPosition, ['name']);
    if (staffFruits.length >= 2) {
      console.warn('getTeamFruits() import kpiPayment, warn found more than one staffFruit, use last one');
    }
    if (staffFruits.length === 0) {
      console.error('getTeamFruits() import kpiPayment failed, staffPosition =', JSON.stringify(staffPosition));
    } else {
      staffFruits[staffFruits.length - 1].kpiPayments.push(kpiPayment);
    }
  }

  for (let dailyPersonalResumeCost of await gBaseDataService.getDailyPersonalResumeCosts(start)) {
    let staffPosition = new StaffPosition();
    staffPosition.name = dailyPersonalResumeCost.name;
    staffPosition.start = moment(dailyPersonalResumeCost.date).format('YYYY-MM-DD');
    staffPosition.end = moment(dailyPersonalResumeCost.date)
      .add(1, 'day')
      .format('YYYY-MM-DD');
    let staffFruits = await searchStaffFruits(teamFruits, staffPosition, ['name']);
    if (staffFruits.length >= 2) {
      console.warn('getTeamFruits() import dailyPersonalResumeCost, warn found more than one staffFruit, use last one');
    }
    if (staffFruits.length === 0) {
      console.error(
        'getTeamFruits() import dailyPersonalResumeCost failed, staffPosition =',
        JSON.stringify(staffPosition)
      );
    } else {
      staffFruits[staffFruits.length - 1].dailyPersonalResumeCosts.push(dailyPersonalResumeCost);
    }
  }
  teamFruits.forEach(teamFruit => teamFruit.run());
  return teamFruits;
}
async function fillRecruitmentRecalls2Fruits(
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
