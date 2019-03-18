import {
  Achievement,
  Attendance,
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
} from '.';

export interface BaseDataServiceInterface {
  getAchievements(start: string, end?: string): Promise<Achievement[]>;
  getTeamProfitCosts(month: string, end?: string): Promise<TeamProfitCost[]>;

  getRecruitmentRecalls(start: string, end?: string): Promise<RecruitmentRecall[]>;

  getAllKpiPayments(start: string, end?: string): Promise<KpiPayment[]>;

  getPositionChanges(month: string): Promise<PositionChange[]>;
  getCurrentEmployees(start?: string, end?: string): Promise<CurrentEmployee[]>;
  getEmployeeByName(name: string, month: string): Promise<CurrentEmployee>;
  getInitialTeam(): Promise<any[]>;
  getAllCommissionRates(month: string): Promise<CommissionRates[]>;
  getAllSalary(month: string): Promise<BaseSalary[]>;
  getTeamCommissionRates(team: string, manager: string, month: string): Promise<CommissionRates>;
  computeBaseSalary(name: string, month: string): Promise<number>;
  getMinMonthlySalary(staffPosition: StaffPosition, month: string): Promise<number>;
  getAttendanceByStaffPosition(staffPosition: StaffPosition): Promise<Attendance>;
  getDailyPersonalResumeCosts(month: string): Promise<DailyPersonalResumeCost[]>;
  getUserResumeCost(name: string, start: string, end: string): Promise<UserResumeCost>;
  getTeamFruits(team: string, manager: string, month: string): Promise<Fruit[]>;
  visitStaffPositions(start: string, end: string, callback: ((StaffPosition) => Promise<void>));
}
