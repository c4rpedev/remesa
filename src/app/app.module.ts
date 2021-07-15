import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PrintViewComponent } from './pages/print-view/print-view.component';
import { EditComplainComponent } from './pages/complain/edit-complain/edit-complain.component';
import { ListComplainComponent } from './pages/complain/list-complain/list-complain.component';
import { EditProvinceComponent } from './pages/province/edit-province/edit-province.component';
import { EditTransportComponent } from './pages/transport/edit-transport/edit-transport.component';


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
    PrintViewComponent,
    EditComplainComponent,
    ListComplainComponent,
    EditProvinceComponent,
    EditTransportComponent,
      
  ],
  imports: [
    MatTableModule,
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
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
