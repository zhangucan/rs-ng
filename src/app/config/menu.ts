import {Menu, MenuOrientation} from '@er/types';
import {ORG_MODULE_MENU_ITEMS} from '../modules/org/config/menu';
import {SYS_MODULE_MENU_ITEMS} from '../modules/sys/config/menu';
import {EMPLOYEE_MODULE_MENU_ITEMS} from '../modules/employee/config/menu';
import {SALARY_MODULE_MENU_ITEMS} from '../modules/salary/config/menu';
import {DISPATCH_MODULE_MENU_ITEMS} from '../modules/dispatch/config/menu';
import {FINANCIAL_MODULE_MENU_ITEMS} from '../modules/financial/config/menu';
import {PERFORMANCE_MODULE_MENU_ITEMS} from '../modules/performance/config/menu';

export const ROOT_MENU: Menu = {
  orientation: MenuOrientation.STATIC,
  dark: true,
  menuItems: [
    SYS_MODULE_MENU_ITEMS,
    ORG_MODULE_MENU_ITEMS,
    EMPLOYEE_MODULE_MENU_ITEMS,
    DISPATCH_MODULE_MENU_ITEMS,
    FINANCIAL_MODULE_MENU_ITEMS,
    PERFORMANCE_MODULE_MENU_ITEMS,
    SALARY_MODULE_MENU_ITEMS
  ]
};



