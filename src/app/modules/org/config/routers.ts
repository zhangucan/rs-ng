import {DEFAULT_CRUD_ROUTES} from '@app/config/route';
import {PathPropsDataResolver} from '@er/core';
import {ErRoute} from '@er/types';
import {OrgComponent} from '../component';
import {pageProps} from '../pages';
import {OrgChangeComponent} from '../pages/change/component';
import {OrgOutlineComponent} from '../pages/outline/component';

export const routers = <ErRoute[]>[
  {
    path: '',
    component: OrgOutlineComponent
  },
  {
    path: 'change',
    component: OrgChangeComponent
  },
  {
    path: ':module',
    component: OrgComponent,
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
