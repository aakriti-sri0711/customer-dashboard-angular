import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Config} from '../../../../configapi';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import{ApiTalkService} from '../../../../services/api-talk.service';
import{ Router } from '@angular/router';
import{ActivatedRoute} from '@angular/router';
import{ AddressDialogueComponent } from '../../../../reusable/dialogue/address-dialogue/address-dialogue.component';
import{ BillingAddressDialogueComponent } from '../../../../reusable/dialogue/billing-address-dialogue/billing-address-dialogue.component';
@Component({
  selector: 'app-fill-address',
  templateUrl: './fill-address.component.html',
  styleUrls: ['./fill-address.component.scss']
})
export class FillAddressComponent implements OnInit {
  shipping;
  billing;
  public customer_id;
  city_id;
  public address;
  public productList;
  public order;
  public cities;
  public filladdress;
  public remove;
  public paste;
  public pastebilling;
  public removebilling;
  constructor(private apiTalk: ApiTalkService, private route: Router, public dialog: MatDialog) { }


  ngOnInit() {
    
    this.customer_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.shipping = new Shipping
    this.billing = new Billing
    this.getAddress()
  }
  getAddress(){
   
    this.apiTalk.getData(Config.API_URL+"/customer/"+this.customer_id+'/address')
    .then(result => {
     
      if(result['status'] == 200){
        let addressfinal = result['json'][0]
       // console.log(addressfinal)
        this.selectedShippingAddress(addressfinal)
        this.selectedBillingAddress(addressfinal)
       
      }
      else{
        // this.addFirstAddressButton = true; //button for add the first address when no address available
        // this.address = null //setting address list to null
      }  
    
    })
    
  }
  selectedShippingAddress(value){
    this.shipping.id = value.id
    this.shipping.address_line1 = value.address_line1
    this.shipping.address_line2 = value.address_line2
    this.shipping.city = value.city
    this.shipping.landmark = value.landmark
    this.shipping.pincode = value.pincode
    this.shipping.name = value.name
    this.shipping.phone_number = value.phone_number

    
  }

  selectedBillingAddress(value){
    this.billing.id = value.id
    this.billing.address_line1 = value.address_line1
    this.billing.address_line2 = value.address_line2
    this.billing.city = value.city
    this.billing.landmark = value.landmark
    this.billing.pincode = value.pincode
    this.billing.name = value.name
  }

  openShippingModal(){
   return this.apiTalk.getData(Config.API_URL+"/customer/"+this.customer_id+'/address')
   .then(res=>{
    var shippingAddress = res['json']
    const dialogRef = this.dialog.open(AddressDialogueComponent, {
      width: '50%',
      height: '550px',
      data: {shipping: shippingAddress}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.paste = result.data.return
      this.remove = result.data.bool
       }
       else{}
      
      
      
    });
   })
     
    
  }
  openBillingModal(){
    return this.apiTalk.getData(Config.API_URL+"/customer/"+this.customer_id+'/address')
    .then(res=>{
     var billing = res['json']
     const dialogRef = this.dialog.open(BillingAddressDialogueComponent, {
       width: '50%',
       height: '550px',
       data: {billing: billing}
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if(result){
        this.pastebilling = result.data.return
        this.removebilling = result.data.bool
       }
       else{}
       
      
       
     });
    })
  }
  place_order(){
    var obj = JSON.parse(localStorage.getItem('orderSource'))
    console.log(obj)
    console.log(this.shipping)
    console.log(this.billing)
    obj.shipping_address = this.shipping
    obj.billing_address = this.billing
   this.apiTalk.postData(Config.API_URL+Config.ORDERS_URL, obj)
   .then(res=>{
     console.log(res)
   })
    //localStorage.setItem('orderSource', stringfy);
  }

}

class Shipping{
  id : Number
  address_line1 : String
  address_line2 : String
  city : String
  landmark : String
  pincode : Number
  name : String
  phone_number : String
}

class Billing{
  id : Number
  address_line1 : String
  address_line2 : String
  city : String
  landmark : String
  pincode : Number
  name : String
}
