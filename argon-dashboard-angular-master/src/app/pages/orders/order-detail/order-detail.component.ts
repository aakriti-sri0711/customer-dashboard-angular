import { Component, OnInit } from '@angular/core';
import { Config } from '../../../configapi';
import { ApiTalkService } from '../../../services/api-talk.service';
import{Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  public order_id;
  customerData;
  data;
  pages;
  statusId;
  public orderSupply;
  orderSupplyDetails;
  public order;
  constructor(private apiTalk:ApiTalkService, public route: ActivatedRoute, public router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.order_id = params.id
      
    })
    this.getOrder()
    this.getTotalAmountOfOrder()
    this.getOrderSupply()
  }
   getOrder(){
    return this.apiTalk.getData(Config.API_URL+Config.ORDERS_URL+"/"+this.order_id)
      .then(result => {
        console.log(result['json'])
        this.order = result['json']
       
        this.statusId = this.order.order_status_id
        // console.log(this.order.order_supplies[1].order_status_id)
      })
  }
  public total_amount
  getTotalAmountOfOrder(){
    return this.apiTalk.getData(Config.API_URL+Config.ORDERS_URL+"/"+this.order_id+"/order-amount")
    .then(result =>{
      this.orderSupplyDetails = result['json']
      for(let i=0; i < this.orderSupplyDetails.length; i++){
        let deliveredQuantity = parseFloat(this.orderSupplyDetails[i].delivered_quantity)
        let rate = parseFloat(this.orderSupplyDetails[i].rate)
        let dc = parseFloat(this.orderSupplyDetails[i].delivery_charge)

        this.total_amount = (deliveredQuantity * rate) + dc
        
      }
      
      // console.log(this.orderSupplyDetails)

    })
  }
  public ctfdArr
  public arrOfChangedQuantity = []
  async getOrderSupply(){
    console.log(Config.API_URL+Config.ORDERS_URL+"/"+this.order_id+"/supply")
    return this.apiTalk.getData(Config.API_URL+Config.ORDERS_URL+"/"+this.order_id+"/supply")
    .then( result => {
     
      this.orderSupply = result['json']
      
      
    })
  }
  checkacc(){
    console.log('yeyeyye')
  }
  public fillingDetails
  public customer_tank_filling_details
  getFillingDetails(supplyId){
    return this.apiTalk.getData(Config.API_URL+Config.ORDERS_URL+"/"+this.order_id+"/supply/u/"+supplyId)
    .then(result => {
      this.fillingDetails = result['json']
      this.customer_tank_filling_details = this.fillingDetails.customer_tank_filling_details
      // console.log(this.fillingDetails)
    })
  }
  viewInvoices(){
    // this.createTankUpInvoice()
    // this.createVendorInvoice()
    this.router.navigate(['orders/'+this.order_id+'/invoices']);

    // spinner.close()
   
    
  
  }

}
