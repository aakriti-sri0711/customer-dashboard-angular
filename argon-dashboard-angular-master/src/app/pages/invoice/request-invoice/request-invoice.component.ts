import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Config} from '../../../configapi';
import{ApiTalkService} from '../../../services/api-talk.service';
import{ Router } from '@angular/router';
import{ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-request-invoice',
  templateUrl: './request-invoice.component.html',
  styleUrls: ['./request-invoice.component.scss']
})
export class RequestInvoiceComponent implements OnInit {
  public invoiceForm;
  msg;
  constructor(public apiTalk:ApiTalkService) { }

  ngOnInit() {
    this.invoiceForm = new FormGroup({
      email: new FormControl('', Validators.email)
    })
  }

  save(data){
    this.msg = "Invoice has been sent on {{data}}";
  }

}
