import {Component} from '@angular/core';
import {AbstractChangePwdComponent} from '@er/core';

@Component({
  templateUrl: 'change-password.component.html',
  styleUrls: ['style.scss']
})
export class ChangePasswordComponent extends AbstractChangePwdComponent {

  constructor() {
    super();
    this.newPasswordKey = 'newPwd';
    this.oldPasswordKey = 'oldPwd';
  }
}
