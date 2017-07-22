import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { CommonModule }       from "@angular/common";
import { HttpModule }         from "@angular/http";
import { LoginComponent }     from './login.component';
import { FormsModule }        from "@angular/forms";
import { BrowserModule }      from "@angular/platform-browser";
import { HttpService }        from "../common/service/http.service";
import { LaddaModule }        from 'angular2-ladda';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    LaddaModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    HttpService
  ]
})

export class LoginModule {}
