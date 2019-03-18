import {AuthUtils} from '@er/core';
import {CommonsUtils} from '@er/utils';
import {DICT_CODES} from '../modules/commons/dict-code';
import {MenuItem} from '@er/types/lib/menu';

export class MenuUtils {

  private static checkMenuPermission = (options) => {
    const userDept = AuthUtils.getCurrentUser().dept;
    const userRoles = CommonsUtils.getArrayValue(AuthUtils.getCurrentUser().roles);
    const userPermissions = CommonsUtils.getArrayValue(AuthUtils.getCurrentUser().permissions);
    if (options.method) {
      return options.method({userDept, userRoles, userPermissions});
    } else {
      const _dept: string[] = CommonsUtils.getArrayValue(options.dept || []);
      const _role: string[] = CommonsUtils.getArrayValue(options.role || []);
      if (userRoles.indexOf(DICT_CODES.USER_ROLE.codes.SENIOR) >= 0 ||
        userRoles.indexOf(DICT_CODES.USER_ROLE.codes.DIRECTOR) >= 0) {
        return true;
      }
      return (CommonsUtils.isEmpty(_dept) || _dept.indexOf(userDept) >= 0) &&
        (CommonsUtils.isEmpty(_role) || _role.some(role => userRoles.indexOf(role) >= 0));
    }
  };

  static getUserMenuItems(menuItems: MenuItem[]) {
    const userMenuItems: MenuItem[] = [];
    menuItems.forEach(menuItem => {
      const menuPermissions = CommonsUtils.get(menuItem, 'data.permissions');
      if (menuPermissions) {
        const hasRight = MenuUtils.checkMenuPermission(menuPermissions);
        if (hasRight) {
          MenuUtils.addMenuItem(userMenuItems, menuItem);
        }
      } else {
        MenuUtils.addMenuItem(userMenuItems, menuItem);
      }
    });
    return userMenuItems;
  }

  private static addMenuItem(resolvedMenuItems, menuItem) {
    resolvedMenuItems.push(menuItem);
    if (menuItem.hasOwnProperty('items')) {
      const items: MenuItem[] = MenuUtils.getUserMenuItems(menuItem['items']);
      if (items.length > 0) {
        menuItem['items'] = items;
      } else {
        delete menuItem.items;
      }
    }
  }
}
