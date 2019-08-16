import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl ,FormGroup, Validators } from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../services/services.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public login = {'email': '', 'password' : ''};
  loginForm: FormGroup;
  
  isLoginError =  false;
  loading = false;
  submitted = false;
  returnUrl: string;
  isLoader = false;

  constructor(private services: ServicesService, private router: Router) {}

  ngOnInit() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    this.loginForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'device_token' : new FormControl('1122334455'),
      'device_type': new FormControl('web'),
    });
  }

  loginUser() {
    // console.log(this.loginForm.value);
    this.isLoader = true;
    this.router.navigate(['user-list']);
    this.services.checkLogin(this.loginForm.value).subscribe((data: any) => {
          if(data.status == '200'){
            localStorage.setItem('userToken', data.result.token);
            localStorage.setItem('userData', data.result);
            // this.services.rememberToken(data.result.token);
              this.router.navigate(['user-list']);
              this.isLoader = false;
          }else{
            this.isLoginError = true;
            this.isLoader=false;
          }
        },
        (err: HttpErrorResponse) => {
          this.isLoader = false;
          this.isLoginError = true;
        }
    );

  }
}
