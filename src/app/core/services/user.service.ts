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
    if(user == 'clevercloud1' || user == 'buttycomercial'  || user == 'buttyoperaciones' || user == 'buttyekonomico'){
      return true;
    }else{
      return false;
    }
  }

  isSucursal(user: string): boolean{

    if(user == 'sucursalhol' || user == 'sucursalstgo'  || user == 'sucursalhab' || user == 'sucursalmtz' || user == 'restaurante1' || user == 'santamarta'){
      return true;
    }else{
      return false;
    }
  }

  isAgency(user: string): boolean{

    if(user == 'agencymanag3r'){
      return true;
    }else{
      return false;
    }
  }

}
