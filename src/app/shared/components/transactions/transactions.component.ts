import { Component, Input, OnInit } from '@angular/core';
import { ITransactions } from 'src/app/core/interfaces/itransactions.interface';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faTruck, faFutbol, faUser, faBeer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {   
  @Input() transactions!: Array<ITransactions>;

  constructor(private library: FaIconLibrary) { 
    library.addIcons(faShoppingCart, faTruck, faFutbol, faUser, faBeer);
  }

  ngOnInit(): void { }

}
