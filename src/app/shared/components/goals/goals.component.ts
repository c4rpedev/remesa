import { Component, OnInit } from '@angular/core';
import { IGoal } from 'src/app/core/interfaces/igoal.interface';
import { GoalService } from 'src/app/core/services/goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  notFound = false;
  goals!: Array<IGoal>;
  goalsStore: Array<IGoal> = [];
  i: Number = 0;
  sliceIndex: Number = 0;
  sliceEnd: Number =3;
  constructor(private service: GoalService) { }

  ngOnInit(): void {
    this.getGoal();
    
  }

  getGoal(){
    this.service.getGoalProperties().subscribe(
      (data:Array<IGoal>)=>{
        this.goals = data;   
        console.log(this.goals);        
      },(err: any)=>{
        console.error(err);
        this.notFound = true;
      }
    ) 
  }
  next(){    
    
    
  }

}
