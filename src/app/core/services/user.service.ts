import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser.interface';
import { Observable } from 'rxjs';
import { Project } from 'src/app/core/models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

constructor(private http:HttpClient) { 
  
}
  // -- Get User Properties from mock data -- // 
  getUserProperties(): Observable<IUser[]> {  
    return this.http.get<IUser[]>('assets/mock-data/user.json');
  }
  getProjectProperties(): Observable<Project[]> {  
    return this.http.get<Project[]>('assets/mock-data/projects.json');
  }
   
}
