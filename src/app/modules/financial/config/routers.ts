import {DEFAULT_CRUD_ROUTES} from '@app/config/route';
import {PathPropsDataResolver} from '@er/core';
import {ErRoute} from '@er/types';
import {FinancialComponent} from '../component';
import {pageProps} from '../pages';


export const routers = <ErRoute[]>[
  {
    path: ':module',
    component: FinancialComponent,
    resolve: {
      $resolvedProps: PathPropsDataResolver
    },
    data: {
      $props: pageProps
    },
    children: [
      ...DEFAULT_CRUD_ROUTES
    ]
  },
];
