import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Config} from '../../../configapi';
import{ApiTalkService} from '../../../services/api-talk.service';
import{ Router } from '@angular/router';
import{ActivatedRoute} from '@angular/router';
import { AddressComponent } from '../../address/address.component';
import {IMyOptions} from 'mydatepicker'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public showTimePicker = false;
  public orderForm;
  shipping;
  billing;
  public customer_id;
  city_id;
  public address;
  public productList;

  selected
  public product =[
    new Product
  ]
  amount;
  delivery_charge;
  tax;
  public productSearchResult;
  public cities;
  public filladdress;
  public hoursoptions = [10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  public minutesoptions = [15,30,45];
  public minoptions = [0,15,30,45]
  private myDatePickerOptions: IMyOptions 
  public minDate;
public loading;
  public order = {
    order_id : "",
    customer : {
      id : "",
      name : "",
      mobile_number : "",
      delivery_charge : ""
    },
    name : null,
    phone_number : null,
    product : this.product,
    shipping_address : null,
    billing_address : null,
    payment_method : "",
    metadata : "",
    customer_etc_invoice_detail	: "",
    payment_method_id : null,
    delivery_date : null,
    preffered_time : null,
    city_id : null,
    min_time : null,
    max_time : null,
  }
  constructor(private apiTalk: ApiTalkService, private route: Router) { }
  static nonZero(control:FormControl):{ [key: string]: any; } {
    if (Number(control.value) < 0) {
      return {nonZero: true};
    } else {
      return null;
    }
  }
  ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser')).id;
  // this.get()
    this.getCity()
    this.autoProductSefFix()
    var d = new Date();
 
    var date = d.getDate() - 1;
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
     
    var dateStr = date + "/" + month + "/" + year;
   // console.log(dateStr)
    this.myDatePickerOptions =  {
      disableUntil: {year: year, month: month, day: date},
      
  };
   this.minDate = new Date()
   
 
    this.orderForm = new FormGroup({
      product: new FormControl(''),
     
     
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      quantity : new FormControl('', Validators.compose([
                            Validators.required, 
                            Validators.max(1000)
                        ])
                      ),
      payment_method: new FormControl('', Validators.required),
      delivery_date: new FormControl('', Validators.required),
      preffered_time : new FormControl(''),
      city_id : new FormControl(''),
      max_hour: new FormControl('', Validators.required),
      max_min: new FormControl('', Validators.required),
      min_hour: new FormControl('', Validators.required),
      min_min: new FormControl('',Validators.required),
      min_time : new FormControl(''),
      max_time :new FormControl(''),
      id: new FormControl(''),
      amount :new FormControl(''),
      rate :new FormControl(''),
      delivery_charge :new FormControl(''),
      tax :new FormControl(''),
      discount :new FormControl(''),
      
     
    });
   
  }
  get(){
    this.apiTalk.getData(Config.API_URL+"/customer/"+this.customer_id)
    .then(result => {
    
      if(result['status'] == 200){
        
      
        this.address = result['json']
        this.order.customer.id = this.address.id
        this.order.customer.name = this.address.name
        this.order.customer.mobile_number = this.address.mobile_number
       this.order.customer.delivery_charge = this.address.delivery_charge
       
        this.city_id = this.address.city_id
        this.delivery_charge = this.address.delivery_charge
        if(!this.address.delivery_charge){
          this.delivery_charge = '1'
        }
        this.orderForm.get('city_id').setValue(this.city_id)
      //  console.log(this.orderForm.get('city_id').value)
      }
    })
  }
  getCity(){
    this.apiTalk.getData(Config.API_URL+"/city/")
    .then(result => {
     
      if(result['status'] == 200){
        this.cities = result['json']
      }
    })
  }
  public quantityError;
  public paymentError;
  checkQFormValues(){
 // console.log(this.orderForm.get('quantity').value)
  if(this.orderForm.get('quantity').value == ''){
    this.quantityError = true;
  }
  else{
    this.quantityError = false;
  }

  
}
checkPFormValues(){
  if(this.orderForm.get('payment_method').value == ''){
    this.paymentError = true
  }
  else{
    this.paymentError = false
  }
}
  save(){

    console.log(
      this.orderForm.get('delivery_date').value
    )
   
    var d  = this.orderForm.get('delivery_date').value
   // console.log(new d)
    var df = new Date(d),
    month = '' + (df.getMonth() + 1),
    day = '' + df.getDate(),
    year = df.getFullYear();
  //   var date = d.day;
  //   var month = d.month; // Since getMonth() returns month from 0-11 not 1-12
  //   var year = d.year;
     
   var dateStr = year + "-" + month + "-" + day;
   console.log(dateStr)
    this.order.payment_method_id = this.orderForm.get('payment_method').value
 this.order.delivery_date = dateStr
    this.order.city_id = this.orderForm.get('city_id').value
    this.order.min_time = this.orderForm.get('min_hour').value + ':' + this.orderForm.get('min_min').value
    this.order.max_time = this.orderForm.get('max_hour').value + ':' + this.orderForm.get('max_min').value
    
   console.log(this.order)
    let stringfy = JSON.stringify(this.order)
   localStorage.removeItem('orderSource')
     localStorage.setItem('orderSource', stringfy);
     this.loading= true;
    setTimeout( () => {
      this.loading = false
      this.route.navigate(['order/fill-address'])
   this.filladdress = true
    }, 3000 );
    
  }
 
  onDateChanged(event) {
    this.showTimePicker= true;
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
}
 autoProductSefFix(){
 

  return this.apiTalk.getData(Config.API_URL+"/search/product?key=d")
  .then(res => {
    this.get()
    setTimeout(()=> {
      this.selectedProduct(res['json'][0], 0); 
      this.setPriceForSelectedProduct(res['json'][0],0)
    }, 3000)
    
    
   
  })
}
public productLabel = []
  selectedProduct(value, pos){
    this.product[pos].id = value.id
    
   this.orderForm.get('id').setValue(value.id)
    this.selected = true;
   
    this.productSearchResult = null
    if(this.productLabel[pos]){
      this.productLabel[pos].name = value.name
    }
    else{
      this.productLabel.push({name : value.name})
    }
  }
   setPriceForSelectedProduct(value, pos){
   
   
    //this will set the last price availabe in the city price table
    return this.apiTalk.getData(Config.PRODUCT_CITY_URL(this.orderForm.get('city_id').value, value.id))
    .then(result => {
      if(result['status'] == 200){
        this.product[pos].rate = result['json'].price
        //console.log(this.product[pos])
      }
      else{
        this.product[pos].rate = result['json'].msg
      }
      this.orderForm.get('rate').setValue(this.product[pos].rate)
    })
  }
  setQt(i, bool){
    
    var inputquantity = this.orderForm.get('quantity').value
   
    this.product[i].quantity = inputquantity
    if(bool == false){
     
      let rate = this.product[i].rate
      
      this.amount = parseFloat(inputquantity) * parseFloat(rate) || null 
      this.orderForm.get('amount').setValue(this.amount)
      let qt = parseFloat(this.amount) / parseFloat(rate)
      let newvariable = parseFloat(qt.toFixed(2)) || null
      let newDelivery = newvariable * parseFloat(this.delivery_charge)
      this.orderForm.get('delivery_charge').setValue(newDelivery)
      this.tax = newDelivery * 0.18
      this.orderForm.get('tax').setValue(this.tax)
     
     
    }
   
  }
  // addProduct() : void{
  //   this.product.push(new Product)
  // }
}

class Product{
  id : Number;
  quantity : any;
  rate : any;
  discount : Number;
}
