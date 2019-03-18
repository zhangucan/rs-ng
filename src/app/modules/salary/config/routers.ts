import {ErRoute} from '@er/types';
import {DEFAULT_CRUD_ROUTES} from '@app/config/route';
import {PathPropsDataResolver} from '@er/core';
import {SalaryComponent} from '../component';
import {pageProps} from '../pages';


export const routers = <ErRoute[]>[
  {
    path: ':module',
    component: SalaryComponent,
    resolve: {
      $resolvedProps: PathPropsDataResolver,
    },
    data: {
      $props: pageProps,
    },
    children: [
      ...DEFAULT_CRUD_ROUTES,
    ],
  },
];
