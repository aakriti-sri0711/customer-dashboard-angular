import { Component, OnInit } from '@angular/core';
import { ApiTalkService } from '../../../services/api-talk.service';
import { Config } from '../../../configapi';
import{ ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
interface Employee{
  value: string
}
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  user_id;
  contacts;
  addEmployeeForm;
  roles: Employee[] = [
    {value: 'accounts'},
    {value: 'operations'},
    {value: 'payments'},
    {value: 'supervisor'},
    {value: 'owner'}
  ];
  constructor(public apiTalk:ApiTalkService) { }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.getContactPerson()
    this.addEmployeeForm = new FormGroup({
      email: new FormControl(''),
      phone_number: new FormControl(''),
      name: new FormControl(''),
      role: new FormControl(''),
      
    })
  }
  getContactPerson(){
    return this.apiTalk.getData(Config.API_URL+Config.CUSTOMER_URL+'/'+this.user_id+'/contact-person')
    .then(res=>{
      console.log(res)
      this.contacts= res['json']
    })
  }
  public loading;
  save(data){
    data['customer_id'] = this.user_id
    this.loading =true
    setTimeout(()=>{
      this.loading=false
      return this.apiTalk.postData(Config.API_URL+Config.Legal_entity_url+'/customer/customer-employee/', data)
      .then(res=>{
        console.log(res)
        if(res.status == 200){
          alert('created successfully')
          location.reload()
        }
        else{

        }
       // this.contacts= res['json']
      })
    },2000)
   
  }

}
