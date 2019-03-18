import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModuleConfigComponent} from '@er/core';
import {ConfigModel} from '@er/types';
import {PERFORMANCE_MODULE_CONFIG} from './config';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceComponent extends ModuleConfigComponent {
  moduleConfig(): ConfigModel {
    return PERFORMANCE_MODULE_CONFIG;
  }
}
