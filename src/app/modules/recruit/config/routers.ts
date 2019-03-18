import {DEFAULT_CRUD_ROUTES} from '@app/config/route';
import {PathPropsDataResolver} from '@er/core';
import {ErRoute} from '@er/types';
import {RecruitComponent} from '../component';
import {pageModels} from '../pages';


export const routers = <ErRoute[]>[
  {
    path: ':module',
    component: RecruitComponent,
    resolve: {
      $resolvedProps: PathPropsDataResolver
    },
    data: {
      $props: pageModels
    },
    children: [
      ...DEFAULT_CRUD_ROUTES
    ]
  }
];
