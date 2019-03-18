import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModuleConfigComponent} from '@er/core';
import {ConfigModel} from '@er/types';
import {EMP_MODULE_CONFIG} from './config';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent extends ModuleConfigComponent {
  moduleConfig(): ConfigModel {
    return EMP_MODULE_CONFIG;
  }
}
