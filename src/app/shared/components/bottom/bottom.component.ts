import { Component, Input, OnInit } from '@angular/core';
import { faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IFriends } from 'src/app/core/interfaces/ifriends.service';
@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss']
})
export class BottomComponent implements OnInit {
  faDollarSign = faDollarSign;
  faPlus = faPlus;
  @Input() friends!: Array<IFriends>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
