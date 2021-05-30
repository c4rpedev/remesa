import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCountService {
  userCount: number = 0;

  constructor() { }

  setCount(count: number){
    this.userCount = count;
  }
  getCount(): number{
    return this.userCount;
  }
}
