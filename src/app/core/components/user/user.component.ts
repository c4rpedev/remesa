import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userData: any;
    

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProperties().subscribe(
      data=>{
        this.userData = data;
        console.log(data);
      }
    )
  }
  
  public get userProperties() : any {
    return this.userData;
  }
  

}
