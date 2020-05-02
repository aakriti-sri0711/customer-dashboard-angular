import { Component, OnInit } from '@angular/core';
import { ApiTalkService } from './../../services/api-talk.service';
import { Config } from '../../configapi';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user;
  public user_id;
  public customer;
  public city;
  public pincode;
  
  constructor(public apiTalk: ApiTalkService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentuser')).name;
    this.user_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.getCustomer()
    this.getCustomerCity()
  }
  getCustomer(){
    return this.apiTalk.getData(Config.API_URL+Config.CUSTOMER_URL+"/"+this.user_id)
    .then(result => {
      if(result['status'] == 200){
        this.customer = result['json'];
        var re = /[0-9]{6}/; 
        var locationArr = this.customer.verified_address;
        this.pincode = re.exec(locationArr);
        console.log(this.customer.verified_address)
      }
    })
  }
  getCustomerCity(){
    
    return this.apiTalk.getData(Config.API_URL+Config.CITY_URL)
    .then(result => {
      if(result['status'] == 200){
       this.city = result['json']
       
      }
   })
  }
}
