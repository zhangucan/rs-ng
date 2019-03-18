import {MenuItem} from '@er/types';

export const ORG_MODULE_MENU_ITEMS = <MenuItem>{
  label: '机构管理',
  icon: 'fa fa-share-alt',
  items: [
    {
      label: '机构总览',
      icon: 'fa fa-cogs',
      routerLink: '/org'
    },
    {
      label: '当前机构管理',
      icon: 'fa fa-building-o',
      routerLink: '/org/current/browse'
    },
    {
      label: '机构异动管理',
      icon: 'fa fa-building-o',
      routerLink: '/org/change'
    },
    {
      label: '机构信息管理',
      icon: 'fa fa-building-o',
      routerLink: '/org/all/browse'
    }
  ],
};
