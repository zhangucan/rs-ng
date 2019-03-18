import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ErCoreModule} from '@er/core';
import {ROOT_CONFIG} from './config/app';
import {ROOT_ROUTER} from './config/route';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErFormlyRootModule} from '@er/formly';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ErCoreModule.forRoot(ROOT_CONFIG),
    NgxPermissionsModule.forRoot(),
    ErFormlyRootModule,
    ROOT_ROUTER
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
