import { Component, OnInit } from '@angular/core';
import { ApiTalkService } from '../../services/api-talk.service';
import { Config } from '../../configapi';
import{ ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-legal-entities',
  templateUrl: './legal-entities.component.html',
  styleUrls: ['./legal-entities.component.scss']
})
export class LegalEntitiesComponent implements OnInit {
  public user_id;
  constructor(private apiTalk: ApiTalkService) { }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.getEntities()

  }
  public entity
  getEntities(){
    return this.apiTalk.getData(Config.API_URL+Config.Legal_entity_url+'/cust/'+this.user_id)
    .then(res=>{
      this.entity = res['json'].data
     console.log(res['json'].data)
    })
  }

}
