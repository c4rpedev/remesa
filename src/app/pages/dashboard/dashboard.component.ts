import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/core/interfaces/icard.interface';
import { IFriends } from 'src/app/core/interfaces/ifriends.service';
import { IGoal } from 'src/app/core/interfaces/igoal.interface';
import { ITransactions } from 'src/app/core/interfaces/itransactions.interface';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  notFound = false;
  user!: IUser;
  cards!: ICard;
  transactions!: Array<ITransactions>;
  goals!: Array<IGoal>;
  friends!: Array<IFriends>;
  count: number = 0;
  user_count: number = 0;
  card_empty = false;


  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getUser(this.count, this.user_count);
  }

  // -- Get User Data from Service -- //
  getUser(count: number, user_count: number) {
    this.service.getUserProperties().subscribe(
      (data: IUser[]) => {
        this.user = data[user_count];
        if(count < this.user.user.cards.length ){
          this.cards = this.user.user.cards[count];
          this.transactions = this.user.user.cards[count].transactions;
          if(count == this.user.user.cards.length-1){
            this.card_empty = true;
          }
          if(count == 0){
            this.card_empty = false;
          }         
        }  
        this.goals = this.user.user.goals;
        this.friends = this.user.user.friends;        
      }, (err: any) => {
        console.error(err);
        this.notFound = true;
      }
    )
  }
}
