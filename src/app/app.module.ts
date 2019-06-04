import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./login/login.service";
//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ProfileService } from "./profile/profile.service";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { DashboardRoutingModule } from "./dashboard/dashboard-routing.module";
import { UsersComponent } from "./dashboard/users/users.component";
import { TrendsComponent } from "./dashboard/trends/trends.component";
import { ChartModule } from "angular-highcharts";
import { PasswordStrengthBar } from "./shared/password-strength/password-strength.component";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    TrendsComponent,
    PasswordStrengthBar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    DashboardRoutingModule,
    ChartModule,
    FormsModule
  ],
  providers: [LoginService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
