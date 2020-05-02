import { Component, OnInit } from '@angular/core';
import {Config} from '../../../configapi';
import { ApiTalkService } from '../../../services/api-talk.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  tank_id;customer_id;data;pages
  static page = 1
  static limit = 20
  constructor(public apiTalk: ApiTalkService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser'));
    this.route.params.subscribe(params => {
      console.log(params)
      this.tank_id = params['id'];
     
    });
    this.load()
  }
  load(){
    
    let q = '?page='+DetailComponent.page+'&limit='+DetailComponent.limit
    console.log(Config.API_URL+"/customer/"+this.customer_id.id+"/customer-tank-details/"+this.tank_id+q)
    return this.apiTalk.getData(Config.API_URL+"/customer/"+this.customer_id.id+"/customer-tank-details/"+this.tank_id+q)
    .then(result => {
      this.data = result['json'].data
      this.pages = result['json'].pages
    })
  }

  selecPage(no){
    DetailComponent.page = no
    this.load()
  }

}
