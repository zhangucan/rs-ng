import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErCoreModule} from '@er/core';
import {ErFormlyBootstrapModule} from '@er/formly-bootstrap';
import {ErFormlyPrimeNgModule} from '@er/formly-primeng';
import {ErPrimeNgModule} from '@er/primeng';
import {ErValidateModule} from '@er/validate';
import {SysComponent} from './component';
import {routers} from './config/routers';

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
    SysComponent,
  ],
})
export class SysModule {
}
