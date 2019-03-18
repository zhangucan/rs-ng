import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {anyRoleUser, ErCoreModule} from '@er/core';
import {ErPrimeNgModule} from '@er/primeng';
import {ErValidateModule} from '@er/validate';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {ChangePasswordComponent} from './change-pwd/change-password.component';
import {LoginComponent} from './login/component';
import {RegisterComponent} from './register/register.component';

const router = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'changPwd',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: anyRoleUser,
            redirectTo: {
              default: '/user/login'
            }
          }
        },
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ErCoreModule,
    ErValidateModule,
    ErPrimeNgModule,
    RouterModule.forChild(router)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent
  ]
})
export class AuthModule {
}
