import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { CookieService } from 'ngx-cookie-service';
import {Observable} from "rxjs";
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class ServicesService {

  tempData:any;
  
  apiUrl = environment.apiUrl;
  url: string;
  tokenVal:any='';
  constructor(private _http: HttpClient, private router:Router) {
    this.url  = 'https://api.datamuse.com/words?ml=';
  }

  checkLogin(login) {
    const data = {email_id: login.name , password: login.password,
      device_token:login.device_token, device_type:login.device_type};
    // const reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencodeed'});
    return this._http.post(this.apiUrl + '/login', data);
  }

  checkToken(serverTokenStatus){
    //console.log('testing');console.log(serverTokenStatus);
    if(serverTokenStatus=='401'){
      localStorage.removeItem('userToken');
      swal.fire('Error..!', 'Session expired, please login again.', 'warning');
      this.router.navigateByUrl('/login');
      return false;
    }
    if(localStorage.getItem('userToken')){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    } 
  }
  
  getToken(){
    return localStorage.getItem('userToken');
  }

  postRequest(param,route,token):Observable<{}> {
    const data = {};
    const header = new HttpHeaders();
    const other_headers = header.append('Authorization','Bearer ' + token);

    return this._http.post<{}>(this.apiUrl+ '/' + route, param, { headers:other_headers });
  }

  getRequest(route):Observable<{}> {
    return this._http.get<{}>(this.apiUrl+ '/' + route);
  }

  getUserData(param): Observable<{}> {
    const header        = new HttpHeaders();
    const other_header  = header.append('Authorization', 'Bearer ' + param.token);
    return this._http.post<{}>(this.apiUrl + '/user', '', {headers : other_header});
  }

  deleteRequest(id, route, token): Observable<{}> {
    const header        = new HttpHeaders();
    const other_header  = header.append('Content-Type', 'application/json');
    return this._http.delete<{}>(this.apiUrl + '/' + route + '/' + id);
  }

  updateRequest(id, param, route, token): Observable<{}> {
    const header        = new HttpHeaders();
    const other_header  = header.append('Content-Type', 'application/json');
    return this._http.put<{}>(this.apiUrl + '/' + route + '/' + id, param, {headers : other_header});
  }

  requestCreator(param, route, token): Observable<{}> {
    const header        = new HttpHeaders();
    //const other_header  = header.append('Authorization', 'Bearer ' + token);
    const other_header  = header.append('Content-Type', 'application/json');
     
    return this._http.post<{}>(this.apiUrl + '/' + route, param, {headers : other_header});
    
  }
}

