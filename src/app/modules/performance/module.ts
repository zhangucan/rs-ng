import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErCoreModule} from '@er/core';
import {ErFormlyPrimeNgModule} from '@er/formly-primeng';
import {PerformanceComponent} from './component';
import {routers} from './config/routers';


@NgModule({
  imports: [
    ErCoreModule,
    ErFormlyPrimeNgModule,
    RouterModule.forChild(routers)
  ],
  declarations: [PerformanceComponent]
})
export class PerformanceModule {
}
