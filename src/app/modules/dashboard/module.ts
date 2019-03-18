import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErCoreModule} from '@er/core';
import {ErPrimeNgModule} from '@er/primeng';
import {ShareModules} from '@shares';
import {DashboardComponent} from './component';

@NgModule({
  imports: [
    ErCoreModule,
    ErPrimeNgModule,
    ShareModules,
    RouterModule.forChild([
      {path: '', component: DashboardComponent}
    ])
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
