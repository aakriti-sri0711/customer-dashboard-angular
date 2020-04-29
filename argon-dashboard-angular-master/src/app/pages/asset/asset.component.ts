import { Component, OnInit } from '@angular/core';
import { Config } from '../../configapi';
import { ApiTalkService } from '../../services/api-talk.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  public customer_id;
  public data;
  constructor(public apiTalk: ApiTalkService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser'));
    this.get()
  }
  get(){
    return this.apiTalk.getData(Config.API_URL+"/customer/"+this.customer_id.id+"/customer-tank-details")
    .then(result => {
      this.data = result['json']
    })
  }


}
