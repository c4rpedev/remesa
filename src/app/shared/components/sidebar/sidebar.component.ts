import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: string;
  
  isOpened: String;
  admin: boolean;
  sucursal: boolean;
  public screenWidth: any;
  public screenHeight: any;
  
  constructor(
    public userService: UserService,
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document) { 
    
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user =>{
      this.user = user.nickname;
      this.admin = this.userService.isAdmin(this.user);
      this.sucursal = this.userService.isSucursal(this.user);
     }) 

      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
   }

  openMenu(){
    if(this.screenWidth<768){
      if(this.isOpened == "block"){
        this.isOpened = "none"
      }else{
        this.isOpened = "block"
      }
    }
    
    
  }
  isComercial(): boolean{
    if(this.user == 'buttycomercial'){
      return true;
    }else{
      return false;
    }
  }

}
