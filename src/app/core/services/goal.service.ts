import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGoal } from '../interfaces/igoal.interface';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private http:HttpClient) { }

  getGoalProperties(): Observable<IGoal[]> {  
    return this.http.get<IGoal[]>('assets/mock-data/goals.json');
  }
}
