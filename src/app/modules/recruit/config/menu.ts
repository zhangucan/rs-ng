import {MenuItem} from '@er/types';

export const RECRUIT_MODULE_MENU_ITEMS = <MenuItem>{
  label: '招聘管理',
  icon: 'fa fa-wpforms',
  items: [
    {
      label: '招聘单位管理',
      icon: 'fa fa-code-fork',
      routerLink: '/recruit/employer/browse'
    }
    // {
    //   label: '招聘岗位管理',
    //   icon: 'fa fa-code-fork',
    //   routerLink: '/recruit/employer/browse',
    // },
    // {
    //   label: '应聘人员管理',
    //   icon: 'fa fa-code-fork',
    //   routerLink: '/sys/inUnit/browse',
    // },
  ]
};
