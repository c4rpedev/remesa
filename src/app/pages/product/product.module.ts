// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

// configuration and services
//import { ProductRoutes } from "./product.routing";

// Components


import { ProductComponent } from "./product.component";
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateComboComponent } from './create-combo/create-combo.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule
    //RouterModule.forChild(ProductRoutes),      
  ],
  declarations: [
    ProductComponent,
    ListProductsComponent,
    AddProductComponent,
    EditProductComponent,
    CreateComboComponent,  
    
  ],
  exports: [],
})
export class ProductModule {}
