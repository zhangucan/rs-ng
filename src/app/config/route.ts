import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {anyRoleUser, ConfigurablePreloadingStrategy} from '@er/core';
import {DEFAULT_ROOT_ROUTER_OPTIONS} from '@er/presets';
import {ErRoutes} from '@er/types';
import {ROOT_CONFIG} from './app';
import {PngTreeNavTableComponent} from '@er/primeng';
import {PngFormlyAuditFormComponent, PngFormlyFormComponent} from '@er/formly-primeng';
import {NgxPermissionsGuard} from 'ngx-permissions';


export const ROOT_ROUTES: ErRoutes = [
  {
    path: '',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: anyRoleUser,
        redirectTo: {
          default: '/user/login'
        }
      }
    },
    children: [
      {
        path: '',
        loadChildren: './work-space/module#AdminWorkSpaceModule'
      }
    ]
  },
  {
    path: 'user',
    loadChildren: './modules/auth/auth.module#AuthModule',
    data: {
      preload: true
    }
  }
];

export const ROOT_ROUTER: ModuleWithProviders = RouterModule.forRoot(ROOT_ROUTES, {
  ...DEFAULT_ROOT_ROUTER_OPTIONS,
  useHash: ROOT_CONFIG.isProduction,
  enableTracing: ROOT_CONFIG.enableRouteLogger,
  preloadingStrategy: ConfigurablePreloadingStrategy
});

export const auditPageCaption = {
  method: (label) => `审核${label}`
};

export const DEFAULT_CRUD_ROUTES = [
  {
    path: 'browse',
    component: PngTreeNavTableComponent,
    data: {
      $reuse: false
    },
    children: [
      {
        path: 'add',
        data: {
          tableId: ':tableId',
          $propsKey: 'form'
        },
        component: PngFormlyFormComponent,
        outlet: 'aux'
      },
      {
        path: 'edit/:id',
        data: {
          _action: ':action',
          tableId: ':tableId',
          modelId: ':id',
          $propsKey: 'form'
        },
        component: PngFormlyFormComponent,
        outlet: 'aux'
      },
      {
        path: 'audit/:id',
        data: {
          _action: ':action',
          modelId: ':id',
          $propsKey: 'form'
        },
        component: PngFormlyAuditFormComponent,
        outlet: 'aux'
      }
    ]
  },
  {
    path: 'add',
    data: {
      tableId: ':tableId',
      $propsKey: 'form'
    },
    component: PngFormlyFormComponent
  },
  {
    path: 'edit/:id',
    data: {
      _action: ':action',
      tableId: ':tableId',
      modelId: ':id',
      $propsKey: 'form'
    },
    component: PngFormlyFormComponent,
  },
  {
    path: 'audit',
    component: PngTreeNavTableComponent,
    data: {
      caption: auditPageCaption
    },
  },
  {
    path: 'audit/:id',
    data: {
      _action: ':action',
      tableId: ':tableId',
      modelId: ':id',
      $propsKey: 'form'
    },
    component: PngFormlyAuditFormComponent,
  }
];
