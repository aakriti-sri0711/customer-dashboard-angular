import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public userForm;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      billing_name: [''],
      mobile_number: [''],
      gst_number: ['',Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
      credit_period: ['',Validators.compose([Validators.pattern('^(0|[1-9][0-9]*)$')])],
      email: ['',Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      verified_address: [''],
      password: ['', Validators.required],
      reEnterPassword: ['', Validators.required],
      created_by : [{value:`${JSON.parse(localStorage.getItem('currentUser')).username} at ${new Date()}`}],
      city_id: ['', Validators.required]
    });
  }

}
