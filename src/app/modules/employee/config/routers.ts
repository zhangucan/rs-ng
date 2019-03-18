import {DEFAULT_CRUD_ROUTES} from '@app/config/route';
import {PathPropsDataResolver} from '@er/core';
import {PngFormlyFormComponent} from '@er/formly-primeng';
import {ErRoute} from '@er/types';
import {EmployeeComponent} from '../component';
import {pageModels} from '../pages';
import {EmployerChangeComponent} from '../pages/change/component';


export const routers = <ErRoute[]>[
  {
    path: 'entry',
    data: {
      $props: pageModels.entry
    },
    component: PngFormlyFormComponent
  },
  {
    path: 'change',
    component: EmployerChangeComponent
  },
  {
    path: ':module',
    component: EmployeeComponent,
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
