import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxPivotGridModule, DxChartModule } from 'devextreme-angular';
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
import { ModalModule } from './_modal';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SendSmsComponent } from './pages/order/send-sms/send-sms.component';
import { FilterItemDirective } from "./filter-item.directive";
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { AutocompleteOffDirective }  from './core/autocomplete'
Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY, );
(Parse as any).serverURL = environment.serverURL;

@NgModule({
  declarations: [
    FilterItemDirective,
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
    RegistroComponent,
    PrintViewComponent,
    EditComplainComponent,
    ListComplainComponent,
    EditProvinceComponent,
    EditTransportComponent,
    SendSmsComponent,
    SucursalComponent,


  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductModule,
    FormsModule,   
    ReactiveFormsModule,
    DxPivotGridModule,
    DxChartModule,
    ModalModule,
    Ng2SearchPipeModule,
    AuthModule.forRoot({
      domain: 'dev-ft3ekf7b.us.auth0.com',
      clientId: 'S9Ja1IysHAA0k7BbD8p8jClINzNrnx43'
    }),
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
