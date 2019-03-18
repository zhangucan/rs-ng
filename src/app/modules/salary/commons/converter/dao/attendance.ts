import * as _ from 'lodash';
import * as moment from 'moment';
import {Attendance, Employee, StaffPosition} from '@uranplus/cavalry-define';
import {ApiUtils} from '@er/core';
import esb = require('elastic-builder');

const attendance_index = 'attendance';
const ask4leave_index = 'ask4leave';
const business_trip_index = 'business_trip';
const gMonthAttendanceUtilMap = new Map<string, Promise<AttendanceUtil>>();
const maxSize = 99999;
const debug = require('debug')('converter/attendance');

export class AttendanceUtil {
  monthDate: any;
  attendanceDetails: any = null;
  gAsk4leaveDetails: any = null;
  businessTripDetails: any = null;
  gEmployeeSchedul: any = null;
  constructor(month: string) {
    this.monthDate = moment(month)
      .startOf('month')
      .format('YYYY-MM-DD');
  }

  async getCachedEntities(index) {
    if (!this[index + 'Cache']) {
      this[index + 'Cache'] = ApiUtils.getByQuery(index, {
        query: esb.termQuery('month', this.monthDate),
        size: maxSize
      })
        .toPromise()
        .then(resp => {
          if (resp && resp.items instanceof Array) {
            return resp.items;
          } else {
            return [];
          }
        });
    }
    return this[index + 'Cache'];
  }

  async getBusinessTripsByName(name) {
    return (await this.getCachedEntities(business_trip_index)).filter(
      item => item.name === name && item.month === this.monthDate
    );
  }

  async getAsk4leavesByName(name) {
    return (await this.getCachedEntities(ask4leave_index)).filter(
      item => item.status === '同意' && item.name === name && item.month === this.monthDate
    );
  }

  async getAttendanceByName(name) {
    return (await this.getCachedEntities(attendance_index)).find(
      item => item.name === name && item.month === this.monthDate
    );
  }

  async getAllScheduling(): Promise<Employee[]> {
    // if (!this.gEmployeeSchedul) {
    //   const temp = path.join(
    //     require('@uranplus/cavalry-raw-files'),
    //     `/nj-data/${this.monthDate}/attendance/派遣部考勤.xlsx`
    //   );
    //   this.gEmployeeSchedul = xlsx2json(temp, 0).map(item => {
    //     const entry = trimObj(item);
    //     const employee = new Employee();
    //     employee.name = entry['姓名'];
    //     employee.status = entry['是否上班'];
    //     employee.month = entry['日期'];
    //     return employee;
    //   });
    //   return this.gEmployeeSchedul;
    // } else {
    //   return this.gEmployeeSchedul;
    // }
    return [];
  }
  getAttendDetail(attendanceDetail, ask4leave, businessTrip) {
    if (!attendanceDetail) {
      throw new Error('attendance not found!');
    }
    const detail = attendanceDetail.detail;
    const result = Object.keys(detail)
      .filter(q => !/未排班/g.test(detail[q]))
      .map(q => {
        const tempAttendance = new Map();
        const tempAsk4leave = new Map();
        const tempBusinessTrip = new Map();
        const forgetPunchCardTimes = new Map();
        const lateTimes = new Map();
        tempAttendance.set(q, 1);
        const a = ask4leave.find(item => moment(q).isSameOrAfter(item.start) && moment(q).isSameOrBefore(item.end));
        const b = businessTrip.find(item => moment(q).isSameOrAfter(item.start) && moment(q).isSameOrBefore(item.end));
        if (/旷工/g.test(detail[q])) {
          if (a) {
            if (Math.abs(a.range - _.ceil(a.range)) === 0.5) {
              if (moment(q).isSame(a.start) || moment(q).isSame(a.end)) {
                tempAttendance.set(q, 0.5);
                tempAsk4leave.set(q, 0.5);
              } else {
                tempAttendance.set(q, 0);
                tempAsk4leave.set(q, 1);
              }
            } else {
              tempAttendance.set(q, 0);
              tempAsk4leave.set(q, 1);
            }
          } else if (b) {
            tempBusinessTrip.set(q, 1);
            tempAttendance.set(q, 1);
          } else {
            const schedule = this.gEmployeeSchedul.find((schedul: Employee) => {
              return schedul.name === attendanceDetail.name && schedul.month === q;
            });
            if (schedule) {
              if (schedule.status === '否') {
                tempAttendance.set(q, -2);
              } else {
                tempAttendance.set(q, 1);
              }
            } else {
              tempAttendance.set(q, -2);
            }
          }
        } else if (/缺卡/g.test(detail[q])) {
          if (a) {
            if (Math.abs(a.range - _.ceil(a.range)) === 0.5) {
              if (moment(q).isSame(a.start) || moment(q).isSame(a.end)) {
                tempAttendance.set(q, 0.5);
              } else {
                tempAttendance.set(q, 0);
              }
            } else {
              tempAttendance.set(q, 0);
            }
          } else if (b) {
            tempBusinessTrip.set(q, 1);
            tempAttendance.set(q, 1);
          } else {
            tempAttendance.set(q, 1);
            forgetPunchCardTimes.set(q, 1);
          }
        } else if (/迟到/g.test(detail[q]) || /早退/g.test(detail[q])) {
          if (a) {
            if (Math.abs(a.range - _.ceil(a.range)) === 0.5) {
              if (moment(q).isSame(a.start) || moment(q).isSame(a.end)) {
                tempAttendance.set(q, 0.5);
                tempAsk4leave.set(q, 0.5);
              } else {
                tempAttendance.set(q, 0);
                tempAsk4leave.set(q, 1);
              }
            } else {
              tempAttendance.set(q, 0);
              tempAsk4leave.set(q, 1);
            }
          } else {
            lateTimes.set(q, 1);
            tempAttendance.set(q, 1);
          }
        } else if (detail[q] === '正常') {
          if (a) {
            if (Math.abs(a.range - _.ceil(a.range)) === 0.5) {
              if (moment(q).isSame(a.start) || moment(q).isSame(a.end)) {
                tempAttendance.set(q, 0.5);
                tempAsk4leave.set(q, 0.5);
              } else {
                tempAttendance.set(q, 0);
                tempAsk4leave.set(q, 1);
              }
            } else {
              tempAttendance.set(q, 0);
              tempAsk4leave.set(q, 1);
            }
          } else {
            tempAttendance.set(q, 1);
          }
        }

        return {
          date: q,
          tempAttendance: tempAttendance.get(q) ? tempAttendance.get(q) : 0,
          tempAsk4leave: tempAsk4leave.get(q) ? tempAsk4leave.get(q) : 0,
          tempBusinessTrip: tempBusinessTrip.get(q) ? tempBusinessTrip.get(q) : 0,
          forgetPunchCard: forgetPunchCardTimes.get(q) ? forgetPunchCardTimes.get(q) : 0,
          late: lateTimes.get(q) ? lateTimes.get(q) : 0
        };
      });

    return result.reduce((pre, item) => {
      pre[item.date] = item;
      return pre;
    }, {});
  }

  async getAttendanceByRange(name, start, end): Promise<Attendance> {
    let should = 0;
    let acture = 0;
    let lateTimes = 0;
    let forgetPunchCardTimes = 0;
    let businessTripTimes = 0;
    let detail = {};

    const attendanceDetail = await this.getAttendanceByName(name);
    const ask4leaves = await this.getAsk4leavesByName(name);
    const businessTrips = await this.getBusinessTripsByName(name);
    start = moment(start).format('YYYY-MM-DD');
    end = moment(end)
      .subtract(1, 'days')
      .format('YYYY-MM-DD');
    detail = this.getAttendDetail(attendanceDetail, ask4leaves, businessTrips);
    const filterResult = Object.keys(detail).filter(
      item => moment(item).isSameOrAfter(start) && moment(item).isSameOrBefore(end)
    );
    should = filterResult.length;
    acture = filterResult.reduce((total, item) => {
      return total + detail[item].tempAttendance;
    }, 0);
    businessTripTimes = filterResult.reduce((total, item) => {
      return total + detail[item].tempBusinessTrip;
    }, 0);
    forgetPunchCardTimes = filterResult.reduce((total, item) => {
      return total + detail[item].forgetPunchCard;
    }, 0);
    lateTimes = filterResult.reduce((total, item) => {
      return total + detail[item].late;
    }, 0);

    return {
      name: name,
      start: start,
      end: end,
      should: should,
      acture: acture,
      businessTripTimes: businessTripTimes,
      forgetPunchCardTimes: forgetPunchCardTimes,
      lateTimes: lateTimes,
      detail: detail
      // attendanceDetail: attendanceDetail.detail,
      // ask4leaveDetail: ask4leave,
      // businessTripDetail: businessTrip,
    };
  }
  async init() {
    this.gEmployeeSchedul = await this.getAllScheduling();
  }
}

export async function _getAttendanceUtilOfMonth(month: string) {
  const attendanceUtil = new AttendanceUtil(month);
  await attendanceUtil.init();
  return attendanceUtil;
}

export async function getAttendanceUtilOfMonth(month: string) {
  const monthStr = moment(month)
    .startOf('month')
    .format('YYYY-MM-DD');
  if (!gMonthAttendanceUtilMap.has(monthStr)) {
    gMonthAttendanceUtilMap.set(monthStr, _getAttendanceUtilOfMonth(monthStr));
  }
  return gMonthAttendanceUtilMap.get(monthStr);
}

export async function getAttendanceByStaffPosition(staffPosition: StaffPosition): Promise<Attendance> {
  const attendanceUtil = await getAttendanceUtilOfMonth(staffPosition.start);
  let attendance = await attendanceUtil
    .getAttendanceByRange(staffPosition.name, staffPosition.start, staffPosition.end)
    .catch(err => {
      console.warn('getAttendanceByStaffPosition() error=' + err.stack);
      return {
        acture: moment(staffPosition.end).diff(moment(staffPosition.start), 'day'),
        should: moment(staffPosition.end).diff(moment(staffPosition.start), 'day'),
        warn: 'getAttendanceByStaffPosition() error=' + err.message
      };
    });
  if (attendance.acture < 0) {
    attendance.acture = 0;
  }
  if (attendance.should === 0 && attendance.acture === 0) {
    const warn =
      'getAttendanceByStaffPosition() ' +
      staffPosition.name +
      '[' +
      staffPosition.start +
      '-' +
      staffPosition.end +
      '] ' +
      'should attendance days is zero, use default attendance';
    console.warn(warn);
    attendance = {
      acture: moment(staffPosition.end).diff(moment(staffPosition.start), 'day'),
      should: moment(staffPosition.end).diff(moment(staffPosition.start), 'day'),
      warn
    };
  }
  return attendance;
}
