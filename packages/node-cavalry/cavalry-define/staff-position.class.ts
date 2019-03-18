import {NodeSlice} from './node-slice.class';
import {JobStatus} from './job-status.enum';
import {Role} from './index';

export class StaffPosition {
  corp?: string; // 公司
  corpCode?: string; //公司代码
  dept?: string; // 部门
  deptCode?: string; //部门代码
  team?: string; // 项目组
  teamCode?: string; // 项目组代码
  manager?: string; // 经理
  group?: string; // 小组名
  groupLeader?: string; // 主管
  groupCode?: string; // 小组代码
  leader?: string; // 直接领导
  title?: Role; // 职级
  position?: string; // 职位
  name?: string; // 姓名
  id?: string; // 记录ID
  employeeId?: string; // 员工id
  start?: string; // 开始日期
  end?: string; // 结束日期
  leaderStart?: string; // 上级开始日期
  leaderEnd?: string; // 上级结束日期
  status?: JobStatus;
  baseSalary?: number; // 基本工资
  nodeSlice?: NodeSlice; // nodeSlice from tree-life
}
