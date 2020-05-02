import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  userForm;
  constructor(private formBuilder: FormBuilder, public auth:AuthenticationService) {}

  ngOnInit() {
    let MOBILE_PATTERN = /^[0-9]{10,10}$/;
    this.userForm = new FormGroup({
      phone_number: new FormControl("",Validators.compose([Validators.required,Validators.pattern(MOBILE_PATTERN)])),
      password: new FormControl("",Validators.compose([Validators.required]))
      
    });
    
  }
  save(){
    //9839747411
     let data = this.userForm.value;
     this.auth.login(data);  
  }
  ngOnDestroy() {
  }

}
