import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { faEnvelope, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserCountService } from 'src/app/core/services/user-count.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {  
  faEnvelope = faEnvelope;
  faBell = faBell;
  faUser = faUser;
  notFound = false; 
  userStore!: IUser[];  
  @Input() user_count!: number;
  @Input() count!: number;
  @Output () countChange= new EventEmitter<number>();
  @Input()  user!: IUser;
  
 constructor(private count_service: UserCountService) { }
    
  ngOnInit(): void { }
  
  onAccountChange(){
    this.count++;       
    this.countChange.emit(0);
    this.count_service.setCount(this.count); 
  }
  
}
