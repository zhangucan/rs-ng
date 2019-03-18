import {Component} from '@angular/core';
import {CommonsUtils, ConfigUtils, IdUtils, StatesUtils} from '@er/utils';
import {ApiDataProps, StateNames} from '@er/types';
import {MenuUtils} from './menu-util';
import {ApiUtils, AuthUtils} from '@er/core';
import {filter, first, map} from 'rxjs/operators';
import * as esb from 'elastic-builder';

@Component({
  template: `
    <png-admin-work-space [httpMenuTag]="httpTag" (onInitMenu)="initRooMenu()">
      <ng-template erTypedTemplate="main">
        <png-announce></png-announce>
        <png-alert></png-alert>
        <png-popup-dialog></png-popup-dialog>
        <png-confirm-dialog></png-confirm-dialog>
        <er-breadcrumbs></er-breadcrumbs>
      </ng-template>
    </png-admin-work-space>
  `,
})

export class AdminWorkSpaceComponent {

  httpTag: string;

  initRooMenu() {
    const rootMenu = ConfigUtils.getConfig().rootMenu || {};
    const roles = AuthUtils.getCurrentUser().roles;
    const dept = AuthUtils.getCurrentUser().dept;
    if (roles || dept) {
      this.httpTag = IdUtils.getRandom();
      const apiDataProps: ApiDataProps[] = [];
      apiDataProps.push(<ApiDataProps>{
        id: 'menus',
        apiEntry: 'sys-menu',
        dataPath: 'items'
      });
      if (roles) {
        apiDataProps.push(<ApiDataProps>{
          id: 'roleMenus',
          apiEntry: 'sys-role-menu',
          query: esb.termsQuery('role', roles),
          dataPath: 'items'
        });
      }
      if (dept && dept['code']) {
        apiDataProps.push({
          id: 'orgMenus',
          apiEntry: 'sys-org-menu',
          query: esb.termsQuery('orgs.code', dept['code']),
          dataPath: 'items[0].menus'
        });
      }
      ApiUtils.batchFetch(apiDataProps, this.httpTag)
        .pipe(
          first(),
          filter(data => data && data['menus']),
          map(data => {
            let userMenus = [];
            const sysMenus = data['menus'];
            if (data['roleMenus']) {
              userMenus = data['roleMenus'];
            }
            if (data['orgMenus']) {
              userMenus = userMenus.concat(data['orgMenus']);
            }
            CommonsUtils.unique(userMenus, 'id');
            userMenus = sysMenus.filter(menu => {
              return userMenus.some(m => m.code === menu.code);
            });
            userMenus = MenuUtils.getUserMenuItems(userMenus);
            StatesUtils.set(StateNames.rootMenu, {
              ...rootMenu,
              menuItems: [
                ...userMenus,
                ...rootMenu.menuItems || []
              ]
            });
          })).subscribe();
    } else {
      StatesUtils.set(StateNames.rootMenu, <{}>rootMenu);
    }
    StatesUtils.set(StateNames.rootMenu, <{}>rootMenu);
  }

}
