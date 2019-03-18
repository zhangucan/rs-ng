import {DeptRef} from './dept';
import {EmpRef} from './employee';
import {GroupRef} from './group';
import {TeamRef} from './team';

export * from './corp';
export * from './dept';
export * from './team';
export * from './group';
export * from './employee';

export const OrgEmpRef = {
  emp: EmpRef,
  dept: DeptRef,
  team: TeamRef,
  group: GroupRef
};
