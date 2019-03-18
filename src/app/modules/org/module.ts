import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErCoreModule} from '@er/core';
import {ErFormlyBootstrapModule} from '@er/formly-bootstrap';
import {ErFormlyPrimeNgModule} from '@er/formly-primeng';
import {ErPrimeNgModule} from '@er/primeng';
import {ErValidateModule} from '@er/validate';
import {OrgComponent} from './component';
import {routers} from './config/routers';
import {OrgChangeComponent} from './pages/change/component';
import {OrgOutlineComponent} from './pages/outline/component';


@NgModule({
  imports: [
    ErCoreModule,
    ErPrimeNgModule,
    ErValidateModule,
    ErFormlyBootstrapModule,
    ErFormlyPrimeNgModule,
    RouterModule.forChild(routers)
  ],
  declarations: [
    OrgComponent,
    OrgOutlineComponent,
    OrgChangeComponent
  ],
})
export class OrgModule {
}
