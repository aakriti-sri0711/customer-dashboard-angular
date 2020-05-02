import { Component, OnInit } from '@angular/core';
import { Config} from '../../../../configapi';
import {ApiTalkService} from '../../../../services/api-talk.service'
import{ ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

interface Employee {
  value: string;
  
}
@Component({
  selector: 'app-edit-contact-person',
  templateUrl: './edit-contact-person.component.html',
  styleUrls: ['./edit-contact-person.component.scss']
})
export class EditContactPersonComponent implements OnInit {
  roles: Employee[] = [
    {value: 'accounts'},
    {value: 'operations'},
    {value: 'payments'},
    {value: 'supervisor'},
    {value: 'owner'}
  ];
  public productForm
  public customer_id;
  public employee;
  constructor(private apiTalk: ApiTalkService, public activated: ActivatedRoute, public route: Router) { }

  ngOnInit() {
    
    this.activated.queryParams.subscribe(params=>{
      console.log(params)
      this.employee = params.employee
    })
    this.customer_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.getEmployee()
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });

  }
  getEmployee(){
    this.apiTalk.getData(Config.API_URL+Config.Legal_entity_url+'/customer/'+this.customer_id+'/employeeById/'+this.employee)
    .then(fetch=>{
     
      this.productForm.get('name').setValue(fetch['json'].data.name)
      this.productForm.get('email').setValue(fetch['json'].data.email)
      this.productForm.get('phone_number').setValue(fetch['json'].data.phone_number)
      this.productForm.get('role').setValue(fetch['json'].data.role)
    })
  }
  public loading
  public msg
  save(data){
    this.loading= true
    setTimeout(()=>{
      this.loading= false
      return this.apiTalk.putData(Config.API_URL+Config.Legal_entity_url+'/customer/'+this.customer_id+'/employeeById/'+this.employee, data)
      .then(res=>{
        console.log(res['json'])
        if(res['json'].msg != ''){
          this.msg  = res['json'].msg
          setTimeout(()=>{
            this.route.navigate(['/employees'])
          }, 1000)
        }
      })
    }, 2000)
    
  }
}
