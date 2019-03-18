import {DEFAULT_CRUD_ROUTES} from '@app/config/route';
import {PathPropsDataResolver} from '@er/core';
import {ErRoute} from '@er/types';
import {SysComponent} from '../component';
import {pageProps} from '../pages';


export const routers = <ErRoute[]>[
  {
    path: ':module',
    component: SysComponent,
    resolve: {
      $resolvedProps: PathPropsDataResolver
    },
    data: {
      $props: pageProps
    },
    children: [
      ...DEFAULT_CRUD_ROUTES
    ],
  },
];
