import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { UserService } from './core/services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';



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
    FontAwesomeModule,
    BrowserAnimationsModule,
    ProductModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule    
  ],
  providers: [
    UserService,
    UserCountService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
