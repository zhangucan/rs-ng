import {MenuItem} from '@er/types';

export const DISPATCH_MODULE_MENU_ITEMS = <MenuItem>{
  label: '派遣管理',
  icon: 'fa fa-wpforms',
  items: [
    {
      label: '竞争对手管理',
      icon: 'fa fa-code-fork',
      routerLink: '/dispatch/competitor/browse'
    },
    {
      label: '派遣单位管理',
      icon: 'fa fa-code-fork',
      routerLink: '/dispatch/employer/browse'
    },
    {
      label: '入职员工录入',
      icon: 'fa fa-code-fork',
      routerLink: '/dispatch/add'
    },
    {
      label: '派遣入职管理',
      icon: 'fa fa-code-fork',
      routerLink: '/dispatch/enroll/browse'
    },
    {
      label: '派遣入职明细',
      icon: 'fa fa-code-fork',
      routerLink: '/dispatch/enrollDetail/browse'
    }
    // {
    //   label: '派遣岗位管理',
    //   icon: 'fa fa-code-fork',
    //   routerLink: '/recruit/employer/browse',
    // },
    // {
    //   label: '入职人员管理',
    //   icon: 'fa fa-code-fork',
    //   routerLink: '/dispatch/inUnit/browse',
    // }
  ]
};
