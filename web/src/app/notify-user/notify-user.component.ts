import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
import {ServicesService} from '../services/services.service'
import {environment} from '../../environments/environment'
import {iterateListLike} from "@angular/core/src/change_detection/change_detection_util";

@Component({
  selector: 'app-notify-user',
  templateUrl: './notify-user.component.html',
  styleUrls: ['./notify-user.component.css']
})
export class NotifyUserComponent implements OnInit {

  notificationLoader :boolean = false;
  notificationMessage : string = '';
  route = 'notify-users';

  public loading = false;
  isLoader: boolean = false;
  totaluser = 0;
  spinLoader = {
    filter : false
  };

  constructor(private _services: ServicesService) {

  }


  ngOnInit() {
    this.getPageRequest();
  }

  fields = [
    {
      'field': 'first_name',
      'title': 'Name',
      'width': '18%',
      'code':true,
      'sort':false
    },
    {
      'field': 'last_name',
      'title': 'Surname',
      'width': '18%',
      'code':true,
      'sort':false
    },
    {
      'field': 'email_id',
      'title': 'Email address',
      'width': '19%',
      'code':true,
      'sort':false
    },
    {
      'field': 'contact_no',
      'title': 'Mobile number',
      'width': '18%',
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

  sortType : string = '';
  sortField: string = '';
  oldField: string;
  sortingData= {
    'field' : '',
    'type'  : ''
  };

  sortBy(field, event){

    this.oldField = (this.oldField != field) ? this.oldField : field;

    if(typeof this.oldField !== 'undefined'){
      //console.log(document.getElementById('fa-'+this.oldField));

      document.getElementById('fa-'+this.oldField).classList.remove('fa-sort-up');
      document.getElementById('fa-'+this.oldField).classList.remove('fa-sort-down');
      document.getElementById('fa-'+this.oldField).classList.add('fa-sort');
    }

    event.target.classList.add('fa');

    this.sortField = field;
    this.sortType = (this.sortType == 'desc') ? 'asc' : 'desc';

    switch(this.sortType){
      case 'desc' : {
        event.target.classList.remove('fa-sort-up');
        event.target.classList.add('fa-sort-down');
        this.oldField = field;
      }break;
      case 'asc'  : {
        event.target.classList.remove('fa-sort-down');
        event.target.classList.add('fa-sort-up');
        this.oldField = field;
      }break;
      default     : {
        event.target.classList.add('fa-sort');
      }
    }

    this.sortingData = {
      'field' : this.sortField,
      'type'  : this.sortType
    };


    this.getPageRequest();
  }

  /*------------------------------Table with Sorting Ends Here--------------------------*/

  /*------------------------------Pagination Integration Starts Here------------------------*/
  currentPage: number = 1;
  loader: boolean = false;
  paginate= {
    'last_page' : 1
  };
  searchFields= [];
  pages: any;
  listData = [];
  editData: Object = {};

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

  isOnePage = false;
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
  /*------------------------------Pagination Integration Starts Here------------------------*/

  isListData : boolean;
  getPageRequest(){

    this.route  = 'get-user-list';

    switch(this.route){

      case 'get-user-list' :{
        var data = {
          //page  : this.currentPage,
          search: {
            'first_name' : this.searchFields['first_name']
          },
          sort  : this.sortingData
        };
      }
        break;
    }

    this.loading = true;
    const token    = localStorage.getItem('userToken');
    this._services.requestCreator(data, this.route, token).subscribe((result: any) => {

      this._services.checkToken(result.status);

      this.spinLoader['filter'] = false;
      this.isListData=false;

      this.listData = [];
      this.listData = result.result;
      console.log(this.listData);

      /*
      this.paginate = result.paginate;
      this.totaluser = result.paginate.total;

      this.currentPage = result.paginate.current_page;

      if(result.paginate.current_page > result.paginate.last_page){
        this.currentPage = result.paginate.last_page;
      }

      this.getPages(this.paginate.last_page);
      */

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

  items = [];
  listIds = [];
  selectedAll = false;
  isNotify = false;

  unCheckAll(){
    this.selectedAll = false;
    this.listData.forEach(item => {
      //console.log(item);
      this.items[item['id']] = this.selectedAll;
    });
  }

  checkAllNotification($event) {

    this.selectedAll = $event.srcElement.checked;
    this.listData.forEach(item => {
      //console.log(item);
      this.items[item['id']] = this.selectedAll;
    });

    var flag = true;
    var isNotify = false;
      this.items.forEach(item =>  {

      if(flag) {
        if (item) {
          isNotify = item;
          flag = false;
        }
      }

    });

    console.log(this.items);

};

  checkNotification($event){

    if(!$event.srcElement.checked){
      this.selectedAll = false;
    }

    var flag = true;
    var isNotify = false;

      this.items.forEach(item => {

      if(flag) {
        if (item) {
          this.isNotify = item;
          flag = false;
        }
      }

    });
    //console.log(this.items);
}


  sendNotification(){

    //console.log(this.items);
    var ids = [];
    this.items.forEach((item, key) => {
      if(item){
        //console.log(key);
        ids.push(key);
      }
    })

    //console.log(ids);return true;

    

    if(!this.notificationMessage){
      swal.fire("Error !", "Please provide valid message.", "warning");
      return;
    }

    if(!ids.length){
      swal.fire("Error !", "Please select at least one user.", "warning");
      return;
    }

    this.route = 'notify-users';
    this.notificationLoader = true;
    var data = {
      'message' : this.notificationMessage,
      'id'      : ids
    };
    
    const token    = localStorage.getItem('userToken');
    this._services.requestCreator(data, this.route, token).subscribe((result: any) => {
      //console.log(result);

      if(!this._services.checkToken(result.status)){

      }else{
        swal.fire(result.messageTitle, result.message, result.messageType);
      }
      this.notificationLoader = false;
      this.notificationMessage = '';
      this.unCheckAll();
    });


  }

}
