import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    user: string;

  constructor(private auth: AuthService) {
    this.auth.user$.subscribe(user=>{
      this.user = user.nickname;
    })
  }

  get getUser(){
    return this.user;
  }

  isAdmin(user: string): boolean{
    console.log('isAdmin');
    console.log(user);
    
    if(user == 'buttymanager' || user == 'buttycomercial'  || user == 'buttyoperaciones' || user == 'buttyekonomico'){
      return true;
    }else{
      return false;
    }
  }

}
