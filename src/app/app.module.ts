import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { UserService } from './core/services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserCountService } from './core/services/user-count.service';
import { ProductModule } from './pages/product/product.module';
import { ListOrdersComponent } from './pages/order/list-orders/list-orders.component';
import { ReportComponent } from './pages/report/report.component';
import { AddOrderComponent } from './pages/order/add-order/add-order.component';
import { LoginComponent } from './pages/login/login.component';
import { EditOrderComponent } from './pages/order/edit-order/edit-order.component';
import { AddComplainComponent } from './pages/complain/add-complain/add-complain.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import * as Parse from 'parse'
import { AuthModule } from '@auth0/auth0-angular';

Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY, );
(Parse as any).serverURL = environment.serverURL;

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    ListOrdersComponent,
    ReportComponent,
    AddOrderComponent,
    LoginComponent,
    EditOrderComponent,
    AddComplainComponent,
    EditProfileComponent,
    RegistroComponent,
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   
    BrowserAnimationsModule,
    ProductModule,
    FormsModule,    
    ReactiveFormsModule,
    
    AuthModule.forRoot({
      domain: 'buttymanager.us.auth0.com',
      clientId: 'HqCeBy0WHL7qHa7MSQWFUWB6QcohLYzT'
    }),
  ],
  providers: [
    UserService,
    UserCountService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
