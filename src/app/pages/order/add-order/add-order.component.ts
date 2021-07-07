import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  products: Array<any> = [{}];
  constructor(
    private router: Router,
    private location:Location
  ) { }

  ngOnInit(): void {
    
    
     this.products = history.state.product;
     console.log('Products');
     
     console.log(this.products);
     
    
  }

}
