import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModuleConfigComponent} from '@er/core';
import {ConfigModel} from '@er/types';
import {FINANCIAL_MODULE_CONFIG} from './config';


@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialComponent extends ModuleConfigComponent {
  moduleConfig(): ConfigModel {
    return FINANCIAL_MODULE_CONFIG;
  }
}
