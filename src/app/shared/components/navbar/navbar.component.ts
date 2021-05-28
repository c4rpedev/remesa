import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserComponent } from 'src/app/core/components/user/user.component';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {  
  notFound = false;
  user!: IUser;
 
  constructor(private service: UserService) { }
    
  ngOnInit(): void {    
    this.getUser();
       
  }
  getUser(){
    this.service.getUserProperties().subscribe(
      (data:IUser)=>{
        this.user = data;           
      },(err: any)=>{
        console.error(err);
        this.notFound = true;
      }
    ) 
  }
}
