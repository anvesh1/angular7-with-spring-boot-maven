import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  count =0;
  user_name ='';
  constructor(private services: ServicesService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
      swal.fire({
        title: 'Are you sure?',
        text: 'You want to logout!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
      if (result.value) {

          this.services.requestCreator({}, 'logout', localStorage.getItem('userToken')).subscribe((result: any) => {
              //console.log(result);
              localStorage.removeItem('userToken');
              localStorage.removeItem('userData');
              this.router.navigate(['login']);
          });
      }
      })
    }
}
