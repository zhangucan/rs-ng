import {DEFAULT_CRUD_ROUTES} from '@app/config/route';
import {PathPropsDataResolver} from '@er/core';
import {PngFormlyFormComponent} from '@er/formly-primeng';
import {ErRoute} from '@er/types';
import {DispatchComponent} from '../component';
import {pageModels} from '../pages';


export const routers = <ErRoute[]>[
  {
    path: 'add',
    data: {
      $props: pageModels.add
    },
    component: PngFormlyFormComponent
  },
  {
    path: ':module',
    component: DispatchComponent,
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
