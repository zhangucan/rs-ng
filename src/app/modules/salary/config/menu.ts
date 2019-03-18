import {MenuItem} from '@er/types';

export const SALARY_MODULE_MENU_ITEMS = <MenuItem>{
  label: '工资管理',
  icon: 'fa fa-money',
  items: [
    {
      label: '基本工资配置',
      icon: 'fa fa-newspaper-o',
      routerLink: '/salary/settings/browse'
    },
    {
      label: '提成比例配置',
      icon: 'fa fa-yen',
      routerLink: '/salary/rate/browse'
    },
    {
      label: '员工工资生成',
      icon: 'fa fa-credit-card-alt',
      routerLink: '/salary/employees/browse'
    },
    {
      label: '工资发放管理',
      icon: 'fa fa-newspaper-o',
      routerLink: '/salary/finalWageData/browse'
    }
  ]
};
