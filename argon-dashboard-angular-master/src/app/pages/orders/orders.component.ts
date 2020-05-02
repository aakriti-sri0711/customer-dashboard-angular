import { Component, OnInit } from '@angular/core';
import { Config } from '../../configapi';
import { ApiTalkService } from '../../services/api-talk.service';
import{ Router} from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public customer_id;
  customerData;
  data;
  pages;

  public orders;
  constructor(private apiTalk:ApiTalkService, private route: Router) { }

  ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser'));
    this.getCustomer()
    this.allOrders()
  }
  getCustomer(){
    return this.apiTalk.getData(Config.API_URL+Config.CUSTOMER_URL+"/"+this.customer_id.id)
    .then(result => {
      if(result['status'] == 200){
        this.customerData = result['json']
        
      }
    })
  }
  ifDelivered(customerTankDetails){
    let total = 0
    customerTankDetails.forEach(element => {
      total += parseFloat(element.quantity)
    })
    return total.toFixed(2)
  }

  allOrders(){
    return this.apiTalk.getData(Config.CUSTOMER_ORDERS(this.customer_id.id))
      .then(result => {
        this.data = result['json'].order
        this.pages = result['json'].pages
      })
  }
  selecPage(page){
    Config.cusOrderPage = page
    // this.load()
    this.allOrders()
  }
  create(){
    this.route.navigate(['order/create'])
  }
}
