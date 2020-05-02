import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiTalkService} from './../../services/api-talk.service';
import { Config } from './../../configapi';
@Component({
  selector: 'app-payments',
 
  templateUrl: './payments.component.html',
 
  styleUrls: ['./payments.css','./payments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent implements OnInit {
  public customer;
  public customer_id;
  public purchase;
  public payment;
  public balance;
  constructor(private apiTalk: ApiTalkService) { }

  ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser'));
    this.getBalanceDetailOfCustomer()
  }
  getBalanceDetailOfCustomer(){
    return this.apiTalk.getData(Config.API_URL+"/payment/balance-detail/"+this.customer_id.id)
    .then(result =>{
      
        this.customer = result['json'].customer
        this.purchase = result['json'].purchase
        this.payment = result['json'].payment
        if(!this.payment){
          this.payment = 0
        }
        
        this.balance = result['json'].balance
        if(this.payment == 0){
          this.balance = this.purchase
        }

    })
  }

}
