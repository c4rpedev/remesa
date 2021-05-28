import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from '../interfaces/icard.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http:HttpClient) { }
  getGoalProperties(): Observable<ICard[]> {  
    return this.http.get<ICard[]>('assets/mock-data/cards.json');
  }
}
