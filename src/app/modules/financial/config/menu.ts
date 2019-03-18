import {MenuItem} from '@er/types';

export const FINANCIAL_MODULE_MENU_ITEMS = <MenuItem>{
  label: '财务管理',
  icon: 'fa fa-money',
  items: [
    {
      label: '部门利润管理',
      icon: 'fa fa-refresh',
      routerLink: '/financial/profit/browse'
    },
    {
      label: '划回业绩管理',
      icon: 'fa fa-yen',
      routerLink: '/financial/recall/browse'
    }
  ]
};
