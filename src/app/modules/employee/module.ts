import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErCoreModule} from '@er/core';
import {ErFormlyBootstrapModule} from '@er/formly-bootstrap';
import {ErFormlyPrimeNgModule} from '@er/formly-primeng';
import {ErPrimeNgModule} from '@er/primeng';
import {ErValidateModule} from '@er/validate';
import {DragDropModule} from 'primeng/primeng';
import {EmployeeComponent} from './component';
import {routers} from './config/routers';
import {EmployerChangeComponent} from './pages/change/component';

@NgModule({
  imports: [
    ErCoreModule,
    ErPrimeNgModule,
    ErValidateModule,
    ErFormlyBootstrapModule,
    ErFormlyPrimeNgModule,
    DragDropModule,
    RouterModule.forChild(routers)
  ],
  declarations: [EmployeeComponent, EmployerChangeComponent]
})
export class EmployeeModule {
}
