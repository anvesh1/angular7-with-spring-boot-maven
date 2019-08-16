import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  msg;
  user_name;
  token;
  constructor() { }

  ngOnInit() {
    // const userData = JSON.parse(localStorage.getItem('userData'));
    // this.user_name     = userData.hasOwnProperty('first_name') ?  (userData.first_name+' '+userData.last_name) : 'Guest';

    // this.token = localStorage.getItem('userToken');

    /*const data = [
     [0, 12, "Good Morning"],
     [12, 18, "Good Afternoon"],
     [18, 24, "Good Evening"]
     ],
     hr = new Date().getHours();

     for(var i=0; i<data.length;i++){
     if(hr >= data[i][0] && hr <= data[i][1]){
     this.msg = data[i][2];
     break;
     }
     }*/
  }

}
