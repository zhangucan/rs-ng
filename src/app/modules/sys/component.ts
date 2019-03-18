import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModuleConfigComponent} from '@er/core';
import {ConfigModel} from '@er/types';
import {SYS_MODULE_CONFIG} from './config';


@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SysComponent extends ModuleConfigComponent {
  moduleConfig(): ConfigModel {
    return SYS_MODULE_CONFIG;
  }
}
