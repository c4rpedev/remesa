import { Component, Input, OnInit } from '@angular/core';
import { IGoal } from 'src/app/core/interfaces/igoal.interface';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faAngleLeft, faTruck, faMountain, faGamepad, faBrush } from '@fortawesome/free-solid-svg-icons';
import { IFriends } from 'src/app/core/interfaces/ifriends.service';
import { ITransactions } from 'src/app/core/interfaces/itransactions.interface';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {  
  slice_begin: number = 0;
  slice_end: number = 3;  
  @Input() goals!: Array<IGoal>;
  @Input() transactions!: Array<ITransactions>;
  @Input() friends!: Array<IFriends>;
  
  constructor(private library: FaIconLibrary) {
    library.addIcons(faAngleRight, faAngleLeft, faTruck, faMountain, faGamepad, faBrush );
   }

  ngOnInit(): void { }

  onNext(){
    if (this.slice_end != this.goals.length-3) {
      this.slice_begin++;
      this.slice_end++;
    }    
  } 
  
}
