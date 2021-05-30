import { Component, OnInit } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faChartLine = faChartLine;
  
  constructor() { }

  ngOnInit(): void { }

}
