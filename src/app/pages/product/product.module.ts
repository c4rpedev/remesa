// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MyFilterPipe } from './search-by-name.pipe'

// configuration and services
//import { ProductRoutes } from "./product.routing";

// Components


import { ProductComponent } from "./product.component";
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateComboComponent } from './create-combo/create-combo.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule } from "@angular/material/dialog";
import { PreviewProductComponent } from './preview-product/preview-product.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatProgressSpinnerModule
    //RouterModule.forChild(ProductRoutes),      
  ],
  declarations: [
    ProductComponent,
    ListProductsComponent,
    AddProductComponent,
    EditProductComponent,
    CreateComboComponent,
    MyFilterPipe,
    PreviewProductComponent  
    
  ],
  exports: [],
})
export class ProductModule {}
