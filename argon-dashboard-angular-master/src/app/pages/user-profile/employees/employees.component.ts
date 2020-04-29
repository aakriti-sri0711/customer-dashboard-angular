import { Component, OnInit } from '@angular/core';
import { ApiTalkService } from '../../../services/api-talk.service';
import { Config } from '../../../configapi';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  user_id;
  contacts;
  constructor(public apiTalk:ApiTalkService) { }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.getContactPerson()
  }
  getContactPerson(){
    return this.apiTalk.getData(Config.API_URL+Config.CUSTOMER_URL+'/'+this.user_id+'/contact-person')
    .then(res=>{
      console.log(res)
      this.contacts= res['json']
    })
  }

}
