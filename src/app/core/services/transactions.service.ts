import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransactions } from '../interfaces/itransactions.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

constructor(private http:HttpClient) { }

getGoalProperties(): Observable<ITransactions[]> {  
  return this.http.get<ITransactions[]>('assets/mock-data/transactions.json');
}
}
