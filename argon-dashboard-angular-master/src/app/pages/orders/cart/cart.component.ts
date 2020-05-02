import { Component, OnInit } from '@angular/core';
import {Config} from '../../../configapi';
import{ApiTalkService} from '../../../services/api-talk.service';
import{ Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public customer_id;
  public order;
  constructor(private apiTalk: ApiTalkService) { }

  ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.getOrder()
  }

  getOrder(){
    this.apiTalk.getData(Config.API_URL+Config.ORDERS_URL+'/cart/saved-items/'+this.customer_id)
    .then(res=>{
     
      this.order = res['json'].rows
     
      
    })
  }

}
