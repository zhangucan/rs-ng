import {MenuItem} from '@er/types';

export const PERFORMANCE_MODULE_MENU_ITEMS = <MenuItem>{
  label: '绩效管理',
  icon: 'fa fa-money',
  items: [
    {
      label: '业绩管理',
      icon: 'fa fa-pie-chart',
      routerLink: '/performance/achievement/browse'
    },
    {
      label: '考核管理',
      icon: 'fa fa-pie-chart',
      routerLink: '/performance/kpi/browse'
    }
  ]
};
