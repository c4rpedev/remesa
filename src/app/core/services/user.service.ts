import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http:HttpClient) { }
  // -- Get User Properties from mock data -- // 
  getUserProperties(): Observable<IUser[]> {  
    return this.http.get<IUser[]>('assets/mock-data/user.json');
  }
}
