import {ChangeDetectionStrategy, Component, ViewContainerRef} from '@angular/core';
import {AppConfigComponent} from '@er/core';
import {ROOT_CONFIG} from '@app/config/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends AppConfigComponent {

  constructor(public rootViewContainerRef: ViewContainerRef) {
    super(rootViewContainerRef);
  }

  appConfig() {
    return ROOT_CONFIG;
  }

}
