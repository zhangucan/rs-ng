import {MenuItem} from '@er/types';
import {DICT_CODES} from '../../commons/dict-code';

export const SYS_MODULE_MENU_ITEMS = <MenuItem>{
  label: '系统管理',
  icon: 'fa fa-wpforms',
  styleClass: 'display-6',
  data: {
    permissions: {
      dept: [DICT_CODES.DEPT.code.TECH],
      role: [DICT_CODES.USER_ROLE.codes.SENIOR, DICT_CODES.USER_ROLE.codes.DIRECTOR]
    }
  },
  items: [
    {
      label: '代码类别管理',
      icon: 'fa fa-wpforms',
      routerLink: '/sys/dataCodeCat/browse'
    },
    {
      label: '代码管理',
      icon: 'fa fa-code-fork',
      routerLink: '/sys/dataCode/browse'
    },

    {
      label: '菜单管理',
      icon: 'fa fa-code-fork',
      routerLink: '/sys/menu/browse'
    },
    {
      label: '角色管理',
      icon: 'fa fa-wpforms',
      routerLink: '/sys/role/browse'
    },
    {
      label: '授权管理',
      icon: 'fa fa-universal-access',
      items: [
        {
          label: '按角色授权',
          icon: 'fa fa-code-fork',
          routerLink: '/sys/roleMenu/browse'
        },
        {
          label: '按组织授权',
          icon: 'fa fa-code-fork',
          routerLink: '/sys/orgMenu/browse'
        }
      ]
    },
    {
      label: '用户管理',
      icon: 'fa fa-user',
      routerLink: '/sys/user/browse'
    },
    // {
    //   label: '权限管理',
    //   icon: 'fa fa-tags',
    //   items: [
    //     {
    //       label: '菜单管理',
    //       icon: 'fa fa-user-o',
    //       routerLink: '',
    //     },
    //     {
    //       label: '权限管理',
    //       icon: 'fa fa-expeditedssl',
    //       routerLink: '',
    //     },
    //     {
    //       label: '角色管理',
    //       icon: 'fa fa-user-secret',
    //       routerLink: '',
    //     },
    // {
    //   label: '系统配置',
    //   icon: 'fa fa-bars',
    //   routerLink: '',
    // },
  ],
};
