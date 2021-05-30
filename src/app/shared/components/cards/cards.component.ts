import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICard } from 'src/app/core/interfaces/icard.interface';
import { ITransactions } from 'src/app/core/interfaces/itransactions.interface';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class CardsComponent implements OnInit {
  checked = false;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  @Input() count!: number;
  @Input() user_count!: number;
  @Output () countChange= new EventEmitter<{count:number, user_count:number}>();
  @Input() transactions!: Array<ITransactions>;
  @Input() cards!: ICard;

  constructor() { }

  ngOnInit(): void { } 
        
  onNext(){
    this.count++;
    this.countChange.emit({count: this.count, user_count: this.user_count});
  }

  onPrevious(){
    this.count--;
    this.countChange.emit({count: this.count, user_count: this.user_count});
  }
  
}
