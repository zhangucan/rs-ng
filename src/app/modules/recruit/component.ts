import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModuleConfigComponent} from '@er/core';
import {ConfigModel} from '@er/types';
import {RECRUIT_MODULE_CONFIG} from './config';


@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecruitComponent extends ModuleConfigComponent {
  moduleConfig(): ConfigModel {
    return RECRUIT_MODULE_CONFIG;
  }
}
