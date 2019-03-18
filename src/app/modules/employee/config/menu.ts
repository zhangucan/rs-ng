import {MenuItem} from '@er/types';

export const EMPLOYEE_MODULE_MENU_ITEMS = <MenuItem>{
  label: '员工管理',
  icon: 'fa fa-users',
  items: [
    {
      label: '员工入职管理',
      icon: 'fa fa-calendar-plus-o',
      items: [
        {
          label: '初试管理',
          routerLink: '/employee/pre1/browse'
        },
        {
          label: '复试管理',
          routerLink: '/employee/pre2/browse'
        },
        {
          label: '试岗管理',
          routerLink: '/employee/pre3/browse'
        },
        {
          label: '未入职管理',
          routerLink: '/employee/pre/browse'
        },
        {
          label: '入职管理',
          routerLink: '/employee/entry'
        }
      ]
    },
    {
      label: '在职员工管理',
      icon: 'fa fa-calendar-check-o',
      routerLink: '/employee/current/browse'
    },
    {
      label: '离职员工管理',
      icon: 'fa fa-calendar-minus-o',
      routerLink: '/employee/leave/browse'
    },
    {
      label: '员工异动管理',
      icon: 'fa fa-calendar-o',
      routerLink: '/employee/change'
    }
    // {
    //   label: '员工综合管理',
    //   icon: 'fa fa fa-user',
    //   routerLink: '/emp/change',
    // },
  ]
};
