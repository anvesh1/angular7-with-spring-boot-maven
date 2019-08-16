import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeCat = [];
  cid:any;

  constructor(private route:ActivatedRoute, private router:Router,private _services: ServicesService) {
      this.route.queryParams.subscribe(params=>{
        this.cid = params['cid'];
		  })
   	}
  ngOnInit() {
    this._services.checkToken('status');
    this.activeCat[1] = true;
  }
  
  setCss(id){
    for(let i =1; i<9; i++) {
      this.activeCat[i] = false;
    }
    this.activeCat[id] = true;
  }


}
