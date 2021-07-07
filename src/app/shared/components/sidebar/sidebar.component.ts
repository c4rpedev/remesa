import { Component, OnInit } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faChartLine = faChartLine;
  isOpened: String;
  public screenWidth: any;
  public screenHeight: any;
  
  constructor() { 
    
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
   }

  openMenu(){
    if(this.screenWidth<768){
      if(this.isOpened == "block"){
        this.isOpened = "none"
      }else{
        this.isOpened = "block"
      }
    }
    
    
  }

}
