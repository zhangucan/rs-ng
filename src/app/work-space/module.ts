import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErPrimeNgModule, PngAdminWorkSpaceModule} from '@er/primeng';
import {ErRoutes} from '@er/types';

import {AdminWorkSpaceComponent} from './component';
import {ModulesRouters} from '../modules/routers';
import {ErCoreModule} from '@er/core';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ErCoreModule,
    ErPrimeNgModule,
    PngAdminWorkSpaceModule,
    RouterModule.forChild(<ErRoutes>[
      {
        path: '',
        component: AdminWorkSpaceComponent,
        children: ModulesRouters,
      },
    ]),
  ],
  declarations: [
    AdminWorkSpaceComponent,
  ],
})
export class AdminWorkSpaceModule {
}
