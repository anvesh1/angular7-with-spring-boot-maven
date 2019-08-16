import { Component, OnInit, ViewChild,TemplateRef} from '@angular/core';
import { ServicesService } from '../services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {environment} from '../../environments/environment';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl ,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public loading = false;
  isLoader: boolean = false;
  public displayList:boolean = false;
  apiBaseUrl = environment.apiBaseUrl;
  totaluser = 0;
  spinLoader = {
    filter : false,
    delete : []
  };

  isListData=false;  

  constructor(private services: ServicesService, private router: Router) {

  }


  ngOnInit() {
    this.editUserForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'emailId': new FormControl('',[Validators.required]),
      'contactNo': new FormControl('',[Validators.required])
    });
    this.getPageRequest();
  }

  fields = [
    {
      'field': 'firstName',
      'title': 'Name',
      'width': '20%',
      'code':true,
      'sort':false
    },
    {
      'field': 'lastName',
      'title': 'Surname',
      'width': '20%',
      'code':true,
      'sort':false
    },
    {
      'field': 'emailId',
      'title': 'Email address',
      'width': '25%',
      'code':true,
      'sort':false
    },
    {
      'field': 'contactNo',
      'title': 'Mobile number',
      'width': '25%',
      'code':true,
      'sort':false
    }

  ]


  resetSearchField(){
    this.spinLoader['filter'] = true;
    this.getPageRequest();
  }

  getSearchRequest(){
    this.spinLoader['filter'] = true;
    this.getPageRequest();
  }

  loader: boolean = false;
  route:string;
  searchFields= [];
  listData = [];
  message = "";
  editData: Object = {};
  currentPage: number = 1;
  paginate= {
    'last_page' : 0
  };
  pages: any;
  isOnePage=false;
  pageSize: number = 5;
  recordsOnPage: number;
  
  previousPage(){
    if(this.currentPage == 1){
      return;
    }

    this.currentPage = this.currentPage -1;
    //console.log(this.currentPage);return;
    this.getPageRequest();

  }

  nextPage() {
    if (this.paginate.last_page-1 < this.currentPage) {
      return;
    }

    this.currentPage ++;
    console.log(this.currentPage);
    this.getPageRequest();
  }

  changePage(){
    this.currentPage = this.currentPage;
    //console.log(this.currentPage);return;
    this.getPageRequest();
  }

  getPages(n){
    if(n>1){
      this.isOnePage=true;
    }else{
      this.isOnePage=false;
    }
    var data = [];
    for (var i = 1; i <= n; i++) {
      data.push(i);
    }
    this.pages = data;
  }


  getPageRequest(){

    this.route  = 'get-all-users';
    //console.log()
    this.loading = true;
    var data = {
          page  : this.currentPage,
          search: {},
          sort  : ''
    };

    this.route = this.route + '?page='+ data.page;
    const token    = localStorage.getItem('userToken');
    //this.services.requestCreator(data, this.route, token).subscribe((result: any) => {
    this.services.getRequest(this.route).subscribe((result: any) => {
      if(!result.length){
        this.message = "No record found.."
      }
      this.isListData = true;
      //console.log(result);
      this.listData = result.content;
      
      this.totaluser = result.totalElements;
      this.recordsOnPage = result.numberOfElements;
      this.paginate.last_page = result.totalPages; 
      //console.log(this.paginate.last_page);
      
      if(this.currentPage > result.totalPages){
        this.currentPage = result.totalPages;
      }

      this.getPages(this.paginate.last_page);

      for (let key in this.spinLoader) {
        if(key == 'delete'){
          this.spinLoader[key] = [];
        }else{
          this.spinLoader[key] = false;
        }
      }

    });
    return true;
  }

  /*--------------------------Edit User starts------------------------*/
  isEditRequest = false;
  editUserForm: FormGroup;
  editSpinLoader :boolean = false;

  editUser(index){
    this.isEditRequest = true;
    this.userId = this.listData[index].id;
    this.userIndex = index; 
    //console.log(index)
    //console.log(this.listData[index]);
    
    this.editUserForm.setValue({
      firstName : this.listData[index].firstName,
      lastName  : this.listData[index].lastName,
      emailId   : this.listData[index].emailId,
      contactNo :this.listData[index].contactNo
    })
  }

  userId = '';
  userIndex = 0;

  enableUserList(){
    this.isEditRequest = false;
  }
  updateUser(){
    this.route='update-user';

    this.editSpinLoader = true;
        this.services.updateRequest(this.userId, this.editUserForm.value,this.route,localStorage.getItem('userToken')).subscribe((result: any) => {
            this.editSpinLoader = false;
            if(result){
              swal.fire("Success!", "User updated successfully..", "success");  
            }else{
              swal.fire("Error!", "Something went wrong, Please try again..", "error");  
            }

            this.listData[this.userIndex] = result;
        });
  }
  /*--------------------------Edit User ends ------------------------*/


  /*--------------------------Delete User starts------------------------*/

  deleteUser(id){
    //this.loading = true;

    // Inside For Swal .fire needed for angular 7 and above version	
    swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this user',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#163862',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {

      if(result.value){
        this.spinLoader.delete[id] = true;
        this.services.deleteRequest(
            id,
            'delete-user',
            localStorage.getItem('userToken')
        ).subscribe((result: any) => {

          if(!result.length){
            this.message = "No record found.."
          }
          //this.loading = false;
          //this.listData = result;

          if(this.recordsOnPage == 1 && this.paginate.last_page > 1){
            this.currentPage = this.currentPage - 1;
          }
          this.getPageRequest();
        });
      }
    })

  }

  /*--------------------------Delete User Ends------------------------*/
}
