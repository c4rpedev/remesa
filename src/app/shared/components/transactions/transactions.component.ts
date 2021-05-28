import { Component, OnInit } from '@angular/core';
import { ITransactions } from 'src/app/core/interfaces/itransactions.interface';
import { TransactionsService } from 'src/app/core/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  notFound = false;
  transactions!: Array<ITransactions>;
  constructor(private service: TransactionsService) { }

  ngOnInit(): void {
    this.getTransactions();
  }
  getTransactions(){
    this.service.getGoalProperties().subscribe(
      (data:Array<ITransactions>)=>{
        this.transactions = data;   
        console.log(this.transactions);        
      },(err: any)=>{
        console.error(err);
        this.notFound = true;
      }
    ) 
  }

}
