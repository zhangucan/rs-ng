import {ErServerApiRequestOptions, EsServerApiRequestOptions} from '@er/presets';
import {ApiPayload, ApiServerType, Breadcrumb, ConfigModel} from '@er/types';
import {environment} from '../../environments/environment';
import {ROOT_MENU} from './menu';
import {ApiUtils} from '@er/core';
import {of} from 'rxjs';
import * as esb from 'elastic-builder';
import {map} from 'rxjs/operators';
import {ConfigUtils} from '@er/utils';
import {ROLE} from '@shares';

export function onLoginSuccess(user) {
  user.mainRole = ROLE.names[user.roles];
  if (!user['pwdUpdateTime']) {
    user.enabled = false;
    ConfigUtils.getConfig().auth.loginSuccessRouter = '/user/changPwd';
  }
}

export function onGetUserInfo(user) {
  if (user.empId) {
    return ApiUtils.getByQuery('sys-employee', <ApiPayload>{
      query: [esb.termsQuery('empId', user.empId), esb.termQuery('isCurrent', true)],
    }).pipe(
      map(data => data['items'] && data['items'][0])
    );
  } else {
    return of({});
  }
}

export const ROOT_CONFIG: ConfigModel = {
  isProduction: true,
  appLogo: 'assets/images/logo.png',
  appTitle: '',
  appName: '纳杰运营管理及监控平台',
  api: {
    default: 'es',
    servers: {
      er: {
        uri: 'http://api2.hbsrcfwj.cn',
        ...ErServerApiRequestOptions,
      },
      es: {
        uri: environment.dataServer,
        ...EsServerApiRequestOptions,
      },
      image: {
        uri: 'http://api2.hbsrcfwj.cn',
      },
      timer: {
        uri: 'http://api2.hbsrcfwj.cn',
      },
    },
  },
  httpTimeout: 5000,
  dataFieldProps: {
    dataCode: {
      apiEntry: 'sys-data-code',
      catKey: 'catCode',
      inUseKey: 'inUse'
    },
  },
  auth: {
    loginRouter: '/user/login',
    changePwdRouter: '/user/changPwd',
    profileRouter: '/',
    loginApiOptions: {
      serverType: ApiServerType.ER,
    },
    requiredUserProps: 'empId',
    failedPropsRouter: '/emp/user',
    loginSuccessRouter: '/',
    changePwdSuccessRouter: '/',
    onLoginSuccess: onLoginSuccess,
    getUserInfo: onGetUserInfo
  },
  stomp: {
    enabled: false,
    url: 'ws://localhost:8088/stomp',
    debug: true,
  },
  routeLogger: false,
  resources: {
    root: 'assets/_models',
    reserve: true,
  },
  rootMenu: ROOT_MENU,
  log: {
    enableApp: true,
  },
  breadcrumb: {
    prefix: [<Breadcrumb>{label: '首页', url: '/'}],
  }
};
