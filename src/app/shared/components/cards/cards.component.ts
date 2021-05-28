import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/core/interfaces/icard.interface';
import { CardsService } from 'src/app/core/services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  notFound = false;
  cards!: Array<ICard>;
  limit: number = 0;
  outcome: number = 0;
  percent: string = '';

  constructor(private service: CardsService) { }

  ngOnInit(): void {
    this.getCards();
    
  }
  getCards(){
    this.service.getGoalProperties().subscribe(
      (data:Array<ICard>)=>{
        this.cards = data;  
        for (let index = 0; index < this.cards.length; index++) {          
          this.limit = this.cards[index].weekly_limit;
          this.outcome = this.cards[index].outcome;         
          this.percent = ((this.outcome /this.limit)*100)+'%';
          console.log("Result :"+this.percent);
        }       
        console.log(this.cards);        
      },(err: any)=>{
        console.error(err);
        this.notFound = true;
      }
    ) 
  }




}
