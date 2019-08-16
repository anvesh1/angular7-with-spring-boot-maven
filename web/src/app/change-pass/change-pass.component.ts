import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { FormControl ,FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  changePasswordForm: FormGroup;
  spinLoader :boolean = false;

  constructor(private _services: ServicesService, private router: Router) { }
  route:any;
  ngOnInit() {
    this._services.checkToken('status');

    this.changePasswordForm = new FormGroup({
      'old_password': new FormControl('', [Validators.required]),
      'new_password': new FormControl('', [Validators.required]),
      'confirm_new_password': new FormControl('',[Validators.required])
    });
  }
  changePassword(){
    this.route='change-password';

    if(this.changePasswordForm.value['new_password']==this.changePasswordForm.value['confirm_new_password']){

        this.spinLoader = true;
        this._services.requestCreator(this.changePasswordForm.value,this.route,localStorage.getItem('userToken')).subscribe((result: any) => {
            this.spinLoader = false;

            if(!this._services.checkToken(result.status)){

            }else{
                swal.fire(result.messageTitle, result.message, result.messageType);
            }

            this.changePasswordForm.reset();
        });
    }else{
      swal.fire('Error..!', 'New password does not match with the confirm password', 'warning');
      this.changePasswordForm.reset();
    }
  }
}
