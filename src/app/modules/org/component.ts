import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModuleConfigComponent} from '@er/core';
import {ConfigModel} from '@er/types';
import {ORG_MODULE_CONFIG} from './config';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgComponent extends ModuleConfigComponent {
  moduleConfig(): ConfigModel {
    return ORG_MODULE_CONFIG;
  }
}
