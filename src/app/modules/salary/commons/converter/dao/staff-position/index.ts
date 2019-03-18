import {ApiUtils} from '@er/core';
import {Employee} from '@employee';
import * as esb from 'elastic-builder';
import {DIC_CAT_MAPPING, JobStatus, StaffPosition} from '@uranplus/cavalry-define';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import * as _ from 'lodash';
import {chopNodeSlice, hasNodeSliceFit} from '@uranplus/cavalry-sdk';
import {EmployeeEntity} from './employee-entity.class';

const debug = require('debug')('converter/staff-position');

const maxSize = 9999;

export async function getStaffPositions(start: string, end: string, teamCodePrefix: string): Promise<StaffPosition[]> {
  const employees = await getEmployeeEntities(teamCodePrefix);
  debug('getStaffPositions() employees=', employees);
  return getStaffPositionSlice(start, end, employees);
}

function getEmployeeEntities(teamCodePrefix: string): Promise<EmployeeEntity[]> {
  if (teamCodePrefix) {
    return ApiUtils.getByQuery(Employee.apiEntry, {
      query: esb.prefixQuery('team.code', teamCodePrefix),
      size: maxSize
    })
      .pipe(map(employees => employees.items))
      .toPromise();
  } else {
    return ApiUtils.getByQuery(Employee.apiEntry, {
      query: esb.matchAllQuery(),
      size: maxSize
    })
      .pipe(map(employees => employees.items))
      .toPromise();
  }
}

function addStartAndEndOfEmployees(employees: EmployeeEntity[]): EmployeeEntity[] {
  return _.flatMap(_.groupBy(employees, employee => employee.name), (employeeListOfOne: EmployeeEntity[], name) => {
    employeeListOfOne = employeeListOfOne.sort(
      (a, b) =>
        moment(a.changeDate ? a.changeDate : a.entryDate).unix() -
        moment(b.changeDate ? b.changeDate : b.entryDate).unix()
    );
    let timePoint: string = null;
    for (let i = employeeListOfOne.length - 1; i >= 0; --i) {
      if (
        employeeListOfOne[i].empStatus &&
        (employeeListOfOne[i].empStatus.name === '离职' || employeeListOfOne[i].empStatus.name === '自离')
      ) {
        timePoint = moment(employeeListOfOne[i].leaveDate)
          .add(1, 'day')
          .format('YYYY-MM-DD');
        if (employeeListOfOne[i].empStatus.name === '离职') {
          employeeListOfOne[i - 1]['status'] = JobStatus.RESIGN;
        } else if (employeeListOfOne[i].empStatus.name === '自离') {
          employeeListOfOne[i - 1]['status'] = JobStatus.LEAVE;
        }
        employeeListOfOne.splice(i, 1);
      } else {
        employeeListOfOne[i].start = employeeListOfOne[i].changeDate
          ? moment(employeeListOfOne[i].changeDate).format('YYYY-MM-DD')
          : moment(employeeListOfOne[i].entryDate).format('YYYY-MM-DD');
        employeeListOfOne[i].end = timePoint;
        timePoint = employeeListOfOne[i].start;
      }
    }
    return employeeListOfOne;
  });
}

export function getStaffPositionSlice(start: string, end: string, employees: EmployeeEntity[]): StaffPosition[] {
  employees = addStartAndEndOfEmployees(employees);

  return _.flatMap(
    _.groupBy(employees.filter(employee => !!employee.team), employee => employee.team.code),
    (employeeList, teamCode) => getStaffPositionSliceOfTeam(start, end, employeeList)
  );
}

function scoreTitle(title): number {
  switch (title) {
    case DIC_CAT_MAPPING.ZJ.YG.name:
      return 50;
    case DIC_CAT_MAPPING.ZJ.ZG.name:
      return 40;
    case DIC_CAT_MAPPING.ZJ.JL.name:
      return 30;
    case DIC_CAT_MAPPING.ZJ.ZJ.name:
      return 20;
    case DIC_CAT_MAPPING.ZJ.GG.name:
      return 10;
  }
}

function getStaffPositionSliceOfManager(
  start: string,
  end: string,
  employees: EmployeeEntity[],
  leaderSlice: EmployeeEntity
) {
  chopNodeSlice(leaderSlice, start, end);
  const newEmployees: EmployeeEntity[] = _.cloneDeep(
    employees.filter(employee => hasNodeSliceFit(employee, leaderSlice.start, leaderSlice.end))
  );
  newEmployees.forEach(employee => chopNodeSlice(employee, leaderSlice.start, leaderSlice.end));

  const groupStaffPositionSlices = _.flatMap(
    newEmployees.filter(employee => employee.title.name === DIC_CAT_MAPPING.ZJ.ZG.name),
    (groupLeaderSlice: EmployeeEntity) =>
      getStaffPositionSliceOfGroup(
        leaderSlice.start,
        leaderSlice.end,
        newEmployees.filter(newEmployee => {
          if (!groupLeaderSlice.group) {
            // console.error('getStaffPositionSliceOfManager() error, groupLeaderSlice=', groupLeaderSlice);
            throw new Error('group not exist in group leader entity');
          }
          return !!newEmployee.group && newEmployee.group.code === groupLeaderSlice.group.code;
        }),
        leaderSlice,
        groupLeaderSlice
      )
  );
  if (employees[0].team.name === '商保二组') {
    debug('getStaffPositionSliceOfTeam() newEmployees=', newEmployees);
  }

  return newEmployees
    .filter(employee => !employee.group)
    .map(employee => getStaffPositionOfEmployeeEntity(employee, leaderSlice))
    .sort((sf1, sf2) => scoreTitle(sf1.title) - scoreTitle(sf2.title))
    .concat(groupStaffPositionSlices);
}

function getStaffPositionOfEmployeeEntity(
  employee: EmployeeEntity,
  managerSlice: EmployeeEntity,
  groupLeaderSlice: EmployeeEntity = null
): StaffPosition {
  return {
    employeeId: employee.empId,
    name: employee.name,
    title: employee.title ? employee.title.name : null,
    position: employee.post ? employee.post.name : null,
    start: employee.start,
    end: employee.end,
    corp: employee.corp ? employee.corp.name : null,
    corpCode: employee.corp ? employee.corp.code : null,
    dept: employee.dept ? employee.dept.name : null,
    deptCode: employee.dept ? employee.dept.code : null,
    team: employee.team ? employee.team.name : null,
    teamCode: employee.team ? employee.team.code : null,
    manager: managerSlice ? managerSlice.name : null,
    groupCode: employee.group ? employee.group.code : null,
    group: employee.group ? employee.group.name : null,
    groupLeader: groupLeaderSlice ? groupLeaderSlice.name : null,
    baseSalary: employee.baseSalary,
    status: employee['status'] ? employee['status'] : null
  };
}

function getStaffPositionSliceOfGroup(
  start: string,
  end: string,
  employees: EmployeeEntity[],
  managerSlice: EmployeeEntity,
  leaderSlice: EmployeeEntity
) {
  chopNodeSlice(leaderSlice, start, end);
  const newEmployees: EmployeeEntity[] = _.cloneDeep(
    employees.filter(employee => hasNodeSliceFit(employee, leaderSlice.start, leaderSlice.end))
  );
  newEmployees.forEach(employee => chopNodeSlice(employee, leaderSlice.start, leaderSlice.end));
  return newEmployees
    .map(employee => getStaffPositionOfEmployeeEntity(employee, managerSlice, leaderSlice))
    .sort((sf1, sf2) => scoreTitle(sf1.title) - scoreTitle(sf2.title));
}

function getStaffPositionSliceOfTeam(start: string, end: string, employees: EmployeeEntity[]): StaffPosition[] {
  if (employees[0].team.name === '泰康项目组') {
    debug('getStaffPositionSliceOfTeam() employees=', employees);
  }

  let managerSlices = [];
  if (employees.filter(employee => employee.title.name === DIC_CAT_MAPPING.ZJ.JL.name).length > 0) {
    managerSlices = employees.filter(employee => employee.title.name === DIC_CAT_MAPPING.ZJ.JL.name);
  } else if (employees.filter(employee => employee.title.name === DIC_CAT_MAPPING.ZJ.ZJ.name).length > 0) {
    managerSlices = employees.filter(employee => employee.title.name === DIC_CAT_MAPPING.ZJ.ZJ.name);
  } else if (employees.filter(employee => employee.title.name === DIC_CAT_MAPPING.ZJ.GG.name).length > 0) {
    managerSlices = employees.filter(employee => employee.title.name === DIC_CAT_MAPPING.ZJ.GG.name);
  } else {
    console.error('getStaffPositionSliceOfTeam() team=', employees[0].team.name, ' manager not found!');
  }
  return _.flatMap(managerSlices, managerSlice => {
    let staffPositions = [];
    try {
      staffPositions = getStaffPositionSliceOfManager(start, end, employees, managerSlice);
      if (employees[0].team.name === '泰康项目组') {
        debug('getStaffPositionSliceOfTeam() staffPositions=', staffPositions);
      }
    } catch (error) {
      console.error('getStaffPositionSliceOfManager() error=', error);
    }
    return staffPositions;
  });
}
