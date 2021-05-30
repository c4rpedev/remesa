import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { faEnvelope, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

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
  @Output () countChange= new EventEmitter<{count:number, user_count:number}>();
  @Input()  user!: IUser;
  
 constructor() { }
    
  ngOnInit(): void { }
  
  onAccountChange(){
    this.user_count++;
    this.count = 0;
    this.countChange.emit({count: this.count, user_count: this.user_count});
  }
  
}
