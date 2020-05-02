import { Injectable } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { Http, Headers, RequestOptions,Response } from '@angular/http';
import { ApiTalkService } from './api-talk.service';
import { Config } from './../configapi';
import { Observable } from 'rxjs';
@Injectable()
export class AuthenticationService {
  
  constructor(public api: ApiTalkService, public route: Router) { }

  msg;
  allow;
  obj;
getUserLoggedIn() {
    return localStorage.getItem('currentuser');
    // return this.isUserLoggedIn;
}

setUserLoggedIn(data) {
    localStorage.setItem('currentuser',data);
}
login(passed_data){
   
   return this.api.postData(Config.API_URL+Config.Legal_entity_url+'/login',passed_data)
    .then(response=>{
      //console.log(response['json'])
      if(response['json'].token != null){
          this.allow = true; 
          this.obj = JSON.stringify({
            id: response['json'].id,
            name: response['json'].username
            
          });
          
          this.setUserLoggedIn(this.obj)
      }
      else{
          this.allow = false;  
      }
      if( this.allow ){
        console.log('logged in')
        this.route.navigate(['/dashboard'])
      }
      else{
        this.msg = "Invalid Credentials";
        console.log(this.msg)
      }
    })
  }
  private handleError (error: Response | any) {
    //Your other codes    
    
      if (error.status == 0){ //or whatever condition you like to put
      this.route.navigate(['/error']);
      }
    }

  
}
