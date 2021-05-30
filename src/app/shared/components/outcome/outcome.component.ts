import { Component, Input, OnInit } from '@angular/core';
import { faShoppingCart, faTruck, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { ITransactions } from 'src/app/core/interfaces/itransactions.interface';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faTruck = faTruck;
  faPlaneDeparture = faPlaneDeparture;
  @Input() transactions!: Array<ITransactions>;
  shopping_outcome: number = 0;
  electronics_outcome: number = 0;
  travel_outcome: number = 0;
  total_outcome: number = 0;

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < this.transactions.length; index++) {
      this.total_outcome = +this.total_outcome + +this.transactions[index].amount;      
      if(this.transactions[index].type=="Shopping"){
        this.shopping_outcome = +this.shopping_outcome+ +this.transactions[index].amount;
      }
      if(this.transactions[index].type=="Electronics"){
        this.electronics_outcome = +this.electronics_outcome+ +this.transactions[index].amount;
      }
      if(this.transactions[index].type=="Travel"){
        this.travel_outcome = +this.travel_outcome+ +this.transactions[index].amount;
      }      
    }
    this.shopping_outcome = Math.round((this.shopping_outcome / this.total_outcome)*100);
    this.electronics_outcome = Math.round((this.electronics_outcome / this.total_outcome)*100);
    this.travel_outcome = Math.round((this.travel_outcome / this.total_outcome)*100);
  }
}
