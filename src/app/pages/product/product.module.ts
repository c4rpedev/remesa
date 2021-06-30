// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
//import { ProductRoutes } from "./product.routing";

// Components


import { ProductComponent } from "./product.component";
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  imports: [
    CommonModule,
    //RouterModule.forChild(ProductRoutes),      
  ],
  declarations: [
    ProductComponent,
    ListProductsComponent,
    AddProductComponent,  
  ],
  exports: [],
})
export class ProductModule {}
