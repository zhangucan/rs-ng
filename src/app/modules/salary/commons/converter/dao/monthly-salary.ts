import {DIC_CAT_MAPPING, StaffPosition} from '@uranplus/cavalry-define';

const debug = require('debug')('converter/monthly-salary');

export async function getMinMonthlySalary(staffPosition: StaffPosition, month: string): Promise<number> {
  if (staffPosition.dept === '派遣部') {
    // TODO get setting from es index `salary-settings`
    if (staffPosition.title === DIC_CAT_MAPPING.ZJ.ZG.name) {
      return 6000;
    } else if (staffPosition.title === DIC_CAT_MAPPING.ZJ.YG.name) {
      return 5000;
    } else {
      return 0;
    }
  } else {
    if (staffPosition.baseSalary) {
      debug('getMinMonthlySalary() staffPosition.baseSalary=', staffPosition.baseSalary);
      return staffPosition.baseSalary;
    } else {
      return 0;
    }
  }
}
