import { Component, OnInit } from '@angular/core';
import { ApiTalkService } from '../../../services/api-talk.service';
import { Config } from '../../../configapi';
import{ ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnInit {
  public entity_id;
  constructor(private apiTalk: ApiTalkService, public route:ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param=>{
      this.entity_id = param.id
      
    })
    this.getEntity()
  }
  public entity;
  getEntity(){
    return this.apiTalk.getData(Config.API_URL+Config.Legal_entity_url+'/'+this.entity_id)
    .then(res=>
      {
        console.log(res['json'])
        this.entity = res['json']
      })
  }

}
