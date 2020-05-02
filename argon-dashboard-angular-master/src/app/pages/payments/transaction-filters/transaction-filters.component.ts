import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Config } from '../../../configapi';
import { ApiTalkService } from '../../../services/api-talk.service';
import {IMyDpOptions} from 'mydatepicker';
import { stringify } from 'qs'

@Component({
  selector: 'app-transaction-filters',
  templateUrl: './transaction-filters.component.html',
  styleUrls: ['./transaction-filters.component.scss']
})
export class TransactionFiltersComponent implements OnInit {
  @Output('result') outgoingData = new EventEmitter<any>();
  constructor(private apiTalk:ApiTalkService) { }
  public myDatePickerOptions: IMyDpOptions = { dateFormat: 'yyyy-mm-dd' }
  
  public financetype
  public query = new Query
  public financestatus
  public from
  public to
  public paymentMode
  public paymentstatus
  public invoicestatus

  ngOnInit() {
    this.financeType()
    this.financeStatus()
    this.paymentOption()
    this.paymentStatus()
    this.invoiceStatus()
    // this.load()
  }

  load(){
    let b
    
    if(this.from || this.to){
      // if(!this.from) this.from = this.to
      // if(!this.to) this.to = this.from
      if(!this.from){
        b = {
          $lte : this.to.formatted+" 23:59:59"
        }
      }
      if(!this.to){
        b = {
          $gte : this.from.formatted+" 00:00:00"
        }
      }
      else if(this.from && this.to){
        b = {
          $between : [this.from.formatted+" 00:00:00",this.to.formatted+" 23:59:59"]
        }
      }
      this.query.date_added = b
    }
    this.outgoingData.emit((this.query))
  }

  financeType(){
    return this.apiTalk.getData(Config.API_URL+"/payment/finance-type")
    .then(result => {
      this.financetype = result['json']
    })
  }

  financeStatus(){
    return this.apiTalk.getData(Config.API_URL+"/payment/finance-status")
    .then(result => {
      this.financestatus = result['json']
    })
  }

  paymentOption(){
    return this.apiTalk.getData(Config.API_URL+"/payment/payment-options")
    .then(result =>{
      this.paymentMode = result['json']
    })
  }

  paymentStatus(){
    return this.apiTalk.getData(Config.API_URL+"/payment/payment-status")
    .then(result =>{
      this.paymentstatus = result['json']
    })
  }

  invoiceStatus(){
    return this.apiTalk.getData(Config.API_URL+"/payment/invoice-status")
    .then(result =>{
      this.invoicestatus = result['json']
    })
  }
  resetFilter(){
    this.query = new Query
    this.outgoingData.emit("reset")
    this.from = null
    this.to = null
  }


}

class Query{
  // customer_id:number
  finance_type_id:number
  finance_status_id:number
  payment_status_id:number
  invoice_status_id:number
  date_added:any
  payment_option_id : number
}
class Date {
  $between : Array<string>
}
