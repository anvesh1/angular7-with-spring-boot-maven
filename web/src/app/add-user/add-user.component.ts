import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { FormControl ,FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  spinLoader :boolean = false;

  constructor(private services: ServicesService, private router: Router) { }
  route:any;
  ngOnInit() {
    //this.services.checkToken('status');
    this.addUserForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'emailId': new FormControl('',[Validators.required]),
      'contactNo': new FormControl('',[Validators.required])
    });
  }
  addUser(){
    this.route='add-user';

    this.spinLoader = true;
        this.services.requestCreator(this.addUserForm.value,this.route,localStorage.getItem('userToken')).subscribe((result: any) => {
            this.spinLoader = false;
            if(result){
              swal.fire("Success!", "User added successfully..", "success");  
            }else{
              swal.fire("Error!", "Something went wrong, Please try again..", "error");  
            }
            

            this.addUserForm.reset();
        });
  }

}
