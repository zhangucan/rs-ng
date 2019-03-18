import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModuleConfigComponent} from '@er/core';
import {ConfigModel} from '@er/types';
import {SALARY_MODULE_CONFIG} from './config';


@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalaryComponent extends ModuleConfigComponent {
  moduleConfig(): ConfigModel {
    return SALARY_MODULE_CONFIG;
  }
}
