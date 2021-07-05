import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditOrderComponent } from './pages/order/edit-order/edit-order.component';
import { LoginComponent } from './pages/login/login.component';
import { AddOrderComponent } from './pages/order/add-order/add-order.component';
import { ListOrdersComponent } from './pages/order/list-orders/list-orders.component';
import { ListProductsComponent } from './pages/product/list-products/list-products.component';
import { ReportComponent } from './pages/report/report.component';
import { AddComplainComponent } from './pages/complain/add-complain/add-complain.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  { path: '', component: ListProductsComponent},
  { path: 'add-product', component: AddProductComponent},
  { path: 'orders', component: ListOrdersComponent},
  { path: 'reports', component: ReportComponent},
  { path: 'add-order', component: AddOrderComponent},
  { path: 'edit-order', component: EditOrderComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'add-complain', component: AddComplainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
