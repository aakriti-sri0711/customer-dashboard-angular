import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Config} from '../../../configapi';
import{ApiTalkService} from '../../../services/api-talk.service';
import{DialogueComponent} from '../../dialogue/dialogue.component'
@Component({
  selector: 'app-billing-address-dialogue',
  templateUrl: './billing-address-dialogue.component.html',
  styleUrls: ['./billing-address-dialogue.component.scss']
})
export class BillingAddressDialogueComponent implements OnInit {

  constructor(public apiTalk:ApiTalkService, public dialogRef: MatDialogRef<BillingAddressDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private route: Router) { }
  public items
  public radioSel
  public radioSelected
  public radioSelectedString
  public showSavedAddress;
  public showForm;
  public radioDIV;
  public addAddressForm;
  customer_id;
  msg;
  removeExisting;
  pasteAddr;
  editAddressForm;
  editON;
  ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser'));
    this.radioDIV = true;
    this.items = [{
      name:'Select from your saved addresses',
      value:'1'
   },
   {
       name:'Add new address',
       value:'2'
    },
  ]
    this.addAddressForm = new FormGroup({
        name: new FormControl(''),
        phone_number: new FormControl(''),
        address_line1: new FormControl(''),
        address_line2: new FormControl(''),
        landmark: new FormControl(''),
        city: new FormControl(''),
        pincode: new FormControl(''),
    })
    
  }
  refresh(): void {
    this.ngOnInit();
  }
  onNoClick(id){
   
    return this.apiTalk.getData(Config.API_URL+"/address/"+id)
    .then(r=>{
      console.log(r['json'])
      this.removeExisting = true;
      this.pasteAddr = r['json'].data
      this.dialogRef.close({action: 1, data:{
        return: this.pasteAddr,
        bool:  this.pasteAddr 
      } });
    })
    
  }
  editAddress(passed){
    this.showSavedAddress = false;
   
    this.editON = true;
    this.editAddressForm = new FormGroup({
      name: new FormControl(''),
      phone_number: new FormControl(''),
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl(''),
      id: new FormControl('')
  })
   
    return  this.apiTalk.getData(Config.API_URL+"/address/"+passed)
    .then(r=>{
     
      this.editAddressForm.get('name').setValue( r['json'].data.name)
      this.editAddressForm.get('phone_number').setValue( r['json'].data.phone_number)
      this.editAddressForm.get('address_line1').setValue( r['json'].data.address_line1)
      this.editAddressForm.get('address_line2').setValue( r['json'].data.address_line2)
      this.editAddressForm.get('pincode').setValue( r['json'].data.pincode)
      this.editAddressForm.get('city').setValue( r['json'].data.city)
      this.editAddressForm.get('landmark').setValue(r['json'].data.landmark)
      this.editAddressForm.get('id').setValue(r['json'].data.id)
    });
   
  }
  updateAddress(val){
   
    return this.apiTalk.putData(Config.API_URL+'/address/'+val.id, val)
    .then(res=>{
      if(res.status == 200){
        console.log('updated')
      }
      console.log(res)
    })
  }
  onBackClick(){
    this.showSavedAddress = false;
    this.radioDIV = true;
  }
  getSelecteditem(){
    this.radioSel = this.items.find(Item => Item.value === this.radioSelected);
    if(this.radioSel.value == 1){
      this.showSavedAddress = true;
      this.radioDIV = false;
    }
    if(this.radioSel.value == 2){
      this.showForm = true;
      this.radioDIV = false;
    }
  }

  onItemChange(item){
    
    this.getSelecteditem();
  }
  saveAddress(data){
    return this.apiTalk.postData(Config.API_URL+Config.CUSTOMER_URL+'/'+this.customer_id.id+'/address', data)
    .then(res=>{
      console.log(res['json'])
      this.msg = res['json'].msg
    })

  }
  onYesClick(){
    this.showSavedAddress = true;
    this.showForm = false;
      this.radioDIV = false;
      this.editON = false;
  }

}
