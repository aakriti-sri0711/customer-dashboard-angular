import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Config } from '../../configapi';
import { ApiTalkService } from '../../services/api-talk.service';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public customer_id;
  customerData;
  purchase;
  payment;
  balance;
  public orders;
  public ordersCount;
  public cancelordersCount;
  public datasets: any;
  public data: any;
  public salesChart;
  public chartSales;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(private apiTalk:ApiTalkService) { }

  ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser'));
    //console.log(this.customer_id.id);
    this.getOrders();
    this.getCustomer()
    this.getBalanceDetailOfCustomer()
    this.getCanceledOrders();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    
   var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    this.chartSales = document.getElementById('chart-sales');

    
  }
  getCustomer(){
    return this.apiTalk.getData(Config.API_URL+Config.CUSTOMER_URL+"/"+this.customer_id.id)
    .then(result => {
      if(result['status'] == 200){
        this.customerData = result['json']
        
      }
    })
  }
  getBalanceDetailOfCustomer(){
    return this.apiTalk.getData(Config.API_URL+"/payment/balance-detail/"+this.customer_id.id)
    .then(result =>{
      
       
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

  allOrders(){
    return this.apiTalk.getData(Config.CUSTOMER_ORDERS(this.customer_id))
    .then(result => {
      this.data = result['json'].order
      
      //this.pages = result['json'].pages
    })
   }



  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  getOrders(){
    return this.apiTalk.getData(Config.API_URL+Config.Legal_entity_url+Config.ORDERS_URL+'/'+this.customer_id.id)
    .then(res=>{
      //console.log(res['json'])
      this.ordersCount = res['json'].count;
     // console.log(this.ordersCount)
      var i;
      for(i= 0; i<= this.ordersCount; i++){
        var j = i;
        i= i + 20;
      //  console.log(i)
      }
      this.salesChart = new Chart(this.chartSales, {
        type: 'line',
       options: chartExample1.options,
       data: chartExample1.data
      });
    })
  }
  getCanceledOrders(){
   
    return this.apiTalk.getData(Config.API_URL+Config.Legal_entity_url+Config.ORDERS_URL+'/canceled/'+this.customer_id.id)
    .then(res=>{
      //console.log(res['json'])
      this.cancelordersCount = res['json'].count;
    })
  }
}
