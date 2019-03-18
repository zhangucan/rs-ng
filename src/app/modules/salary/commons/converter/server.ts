import {
  Achievement,
  Attendance,
  BaseDataServiceInterface,
  BaseSalary,
  CommissionRates,
  CurrentEmployee,
  DailyPersonalResumeCost,
  Fruit,
  KpiPayment,
  PositionChange,
  RecruitmentRecall,
  StaffPosition,
  TeamProfitCost,
  UserResumeCost
} from '@uranplus/cavalry-define';
import {getAchievements} from './dao/achievement';
import {getKpiEntities, getKpiPaymentFromEntity} from './dao/kpi';
import {getStaffPositions} from './dao/staff-position';
import {ApiUtils} from '@er/core';
import * as esb from 'elastic-builder';
import {Profit} from '../../../financial/fields/profit';
import {Salary as SalaryFields, Salary} from '../../fields/salary';
import {getTeamCommissionRates} from './dao/team-commission-rate';
import {getMinMonthlySalary} from './dao/monthly-salary';
import {getAttendanceByStaffPosition} from './dao/attendance-v2';
import {getRecruitmentRecalls} from './dao/recruitment-recall';
import {getUserResumeCost} from './dao/resume-cost';
import moment = require('moment');

const maxSize = 99999;

export class BaseDataService implements BaseDataServiceInterface {
  constructor(public teamCodePrefix: string = null) {}
  async getAchievements(start: string, end?: string): Promise<Achievement[]> {
    if (!end) {
      end = moment(start)
        .add(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
    }
    return getAchievements(start, end, this.teamCodePrefix);
  }

  async getTeamProfitCosts(month: string, end?: string): Promise<TeamProfitCost[]> {
    const teamProfitCosts = (await ApiUtils.getByQuery(Profit.apiEntry, {
      query: [esb.termQuery('month', month), esb.prefixQuery('team.code', this.teamCodePrefix)],
      size: maxSize
    }).toPromise()).items.map(entity => ({
      team: entity.team.name,
      teamCode: entity.team.code,
      manager: entity.manager.name,
      managerId: entity.manager.id,
      incoming: entity.incoming,
      teamCost: entity.teamCost,
      commonCost: entity.commonCost,
      month: entity.month
    }));
    if (teamProfitCosts) {
      return teamProfitCosts;
    } else {
      return [];
    }
  }

  async getRecruitmentRecalls(start: string, end?: string): Promise<RecruitmentRecall[]> {
    return getRecruitmentRecalls(start, end);
  }

  async getAllKpiPayments(start, end): Promise<KpiPayment[]> {
    if (!end) {
      end = moment(start)
        .add(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
    }
    return (await getKpiEntities(start, end, this.teamCodePrefix)).map(entity => getKpiPaymentFromEntity(entity));
  }

  getPositionChanges(month: string): Promise<PositionChange[]> {
    return;
  }

  getCurrentEmployees(...arg): Promise<CurrentEmployee[]> {
    return;
  }

  getEmployeeByName(name: string, month: string): Promise<CurrentEmployee> {
    return;
  }

  getInitialTeam(): Promise<any[]> {
    return;
  }

  getAllCommissionRates(month: string): Promise<CommissionRates[]> {
    return;
  }

  getAllSalary(month: string): Promise<BaseSalary[]> {
    return;
  }

  async getTeamCommissionRates(team: string, manager: string, month: string): Promise<CommissionRates> {
    // Manager is useless here, may use it in future
    return getTeamCommissionRates(team, manager, month);
  }

  computeBaseSalary(name: string, month: string): Promise<number> {
    return;
  }

  async getMinMonthlySalary(staffPosition: StaffPosition, month: string): Promise<number> {
    return getMinMonthlySalary(staffPosition, month);
  }

  async getAttendanceByStaffPosition(staffPosition: StaffPosition): Promise<Attendance> {
    return getAttendanceByStaffPosition(staffPosition);
  }

  async getDailyPersonalResumeCosts(month: string): Promise<DailyPersonalResumeCost[]> {
    return [];
  }
  async getUserResumeCost(name: string, start: string, end: string): Promise<UserResumeCost> {
    return getUserResumeCost(name, start, end);
  }

  getTeamFruits(team: string, manager: string, month: string): Promise<Fruit[]> {
    return;
  }
  async visitStaffPositions(start: string, end: string, callback: ((StaffPosition) => Promise<void>)) {
    const staffPositions = await getStaffPositions(start, end, this.teamCodePrefix);
    for (const staffPosition of staffPositions) {
      await callback(staffPosition);
    }
  }
  async deleteTeamFruits(month: string = null) {
    let query = null;
    if (month && this.teamCodePrefix) {
      query = [esb.termQuery('month', month), esb.prefixQuery('team.code', this.teamCodePrefix)];
    } else if (month) {
      query = esb.termQuery('month', month);
    } else if (this.teamCodePrefix) {
      query = esb.prefixQuery('team.code', this.teamCodePrefix);
    }
    if (query) {
      return ApiUtils.deleteByQuery(SalaryFields.apiEntry, {
        query,
        size: 1000
      }).toPromise();
    } else {
      throw new Error(`you can't remove all team fruits`);
    }
  }

  async deleteFinalFruits(month: string = null) {
    let query = null;
    if (month && this.teamCodePrefix) {
      query = [esb.termQuery('month', month), esb.prefixQuery('team.code', this.teamCodePrefix)];
    } else if (month) {
      query = esb.termQuery('month', month);
    } else if (this.teamCodePrefix) {
      query = esb.prefixQuery('team.code', this.teamCodePrefix);
    }
    if (query) {
      return ApiUtils.deleteByQuery('salary-monthly', {
        query,
        size: 1000
      }).toPromise();
    } else {
      throw new Error(`you can't remove all team fruits`);
    }
  }

  async getAllSalaryNumber(month: string = null) {
    const entities = await ApiUtils.getByQuery(Salary.apiEntry, {
      query: esb.termQuery('month', month),
      size: maxSize
    }).toPromise();
    return entities;
  }
}
