import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErCoreModule} from '@er/core';
import {ErFormlyBootstrapModule} from '@er/formly-bootstrap';
import {ErFormlyPrimeNgModule} from '@er/formly-primeng';
import {ErPrimeNgModule} from '@er/primeng';
import {ErValidateModule} from '@er/validate';
import {routers} from './config/routers';
import {SalaryComponent} from './component';
import {DynamicModule} from 'ng-dynamic-component';
import {CaptionComponent} from './pages/employees/caption';

@NgModule({
  imports: [
    ErCoreModule,
    ErPrimeNgModule,
    ErValidateModule,
    ErFormlyBootstrapModule,
    ErFormlyPrimeNgModule,
    DynamicModule.withComponents([CaptionComponent]),
    RouterModule.forChild(routers),
  ],
  declarations: [SalaryComponent, CaptionComponent],
})
export class SalaryModule {}
