import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.empData = localStorage.getItem('empData');
    // console.log(this.empData);

    // this.activeroute.queryParams.subscribe(params => {
    // this.loader = true;
    // this.userId = params['user_id'];
    // alert(this.userId);
    // })
  }

}
