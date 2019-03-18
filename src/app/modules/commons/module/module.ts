import {NgModule} from '@angular/core';
import {ErCoreModule} from '@er/core';
import {ErPrimeNgModule} from '@er/primeng';
import {ChartPanelComponent} from './components/chart/component';


@NgModule({
  imports: [
    ErCoreModule,
    ErPrimeNgModule
  ],
  declarations: [
    ChartPanelComponent
  ],
  exports: [
    ChartPanelComponent
  ]
})
export class CommonModule {
}
