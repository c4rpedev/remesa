import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { UserCountService } from 'src/app/core/services/user-count.service';
import { UserService } from 'src/app/core/services/user.service';


import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  notFound = false;
  user!: IUser;
  count: number;
  user_count: number;
  card_empty = false;


  constructor(private service: UserService, 
              private count_service: UserCountService, 
               
              
              public auth: AuthService) { 
    this.count = 0;
    this.user_count = 0;  
  }

  ngOnInit(): void {
    
    console.log("Auth user"+this.auth.user$);
    
    console.log();
    
    // if(!this.auth.user$){
    //   this.auth.loginWithRedirect();
    // }
    
  }
 
}
