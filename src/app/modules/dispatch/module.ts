import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErCoreModule} from '@er/core';
import {ErFormlyBootstrapModule} from '@er/formly-bootstrap';
import {ErFormlyPrimeNgModule} from '@er/formly-primeng';
import {DispatchComponent} from './component';
import {routers} from './config/routers';

@NgModule({
  imports: [
    ErCoreModule,
    ErFormlyPrimeNgModule,
    ErFormlyBootstrapModule,
    RouterModule.forChild(routers)
  ],
  declarations: [
    DispatchComponent
  ]
})
export class DispatchModule {
}
