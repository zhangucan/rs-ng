import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModuleConfigComponent} from '@er/core';
import {ConfigModel} from '@er/types';
import {DISPATCH_MODULE_CONFIG} from './config';


@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispatchComponent extends ModuleConfigComponent {
  moduleConfig(): ConfigModel {
    return DISPATCH_MODULE_CONFIG;
  }
}
