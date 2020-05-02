import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Config} from '../../../configapi';
import{ApiTalkService} from '../../../services/api-talk.service';

@Component({
  selector: 'app-address-dialogue',
  templateUrl: './address-dialogue.component.html',
  styleUrls: ['./address-dialogue.component.scss']
})
export class AddressDialogueComponent implements OnInit {

  constructor(public apiTalk:ApiTalkService, public dialogRef: MatDialogRef<AddressDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private route: Router) { }
  public items
  public radioSel
  public radioSelected
  public radioSelectedString
  public showSavedAddress;
  public showForm;
  public radioDIV;
  public addAddressForm;
  editBillAddressForm;
  customer_id;
  msg;
  removeExisting;
  pasteAddr;
  editON;
  public pattern = '^[1-9][0-9]{5}$';
  public phone_number_pattern = '^[1-9][0-9]{9}$'
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
        phone_number: new FormControl('', Validators.pattern(this.phone_number_pattern)),
        address_line1: new FormControl(''),
        address_line2: new FormControl(''),
        landmark: new FormControl(''),
        city: new FormControl(''),
        pincode: new FormControl('', Validators.pattern(this.pattern)),
    })
    
    
  }
  
  onNoClick(id){
   
    return this.apiTalk.getData(Config.API_URL+"/address/"+id)
    .then(r=>{
     // console.log(r['json'])
      this.removeExisting = true;
      this.pasteAddr = r['json'].data
      this.dialogRef.close({action: 1, data:{
        return: this.pasteAddr,
        bool:  this.pasteAddr 
      } });
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
     // console.log(res['json'])
      this.msg = res['json'].msg
    })

  }
  onYesClick(){
    this.showSavedAddress = true;
    this.showForm = false;
      this.radioDIV = false;
      this.editON = false;
  }
  editAddress(passed){
    this.showSavedAddress = false;
   
    this.editON = true;
    this.editBillAddressForm = new FormGroup({
      name: new FormControl(''),
      phone_number: new FormControl('', Validators.pattern(this.phone_number_pattern)),
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl('', Validators.pattern(this.pattern)),
      id: new FormControl('')
  })
   
    return  this.apiTalk.getData(Config.API_URL+"/address/"+passed)
    .then(r=>{
     
      this.editBillAddressForm.get('name').setValue( r['json'].data.name)
      this.editBillAddressForm.get('phone_number').setValue( r['json'].data.phone_number)
      this.editBillAddressForm.get('address_line1').setValue( r['json'].data.address_line1)
      this.editBillAddressForm.get('address_line2').setValue( r['json'].data.address_line2)
      this.editBillAddressForm.get('pincode').setValue( r['json'].data.pincode)
      this.editBillAddressForm.get('city').setValue( r['json'].data.city)
      this.editBillAddressForm.get('landmark').setValue(r['json'].data.landmark)
      this.editBillAddressForm.get('id').setValue(r['json'].data.id)
    });
   
  }
  public updatemsg
  updateBillAddress(val){
   
    return this.apiTalk.putData(Config.API_URL+'/address/'+val.id, val)
    .then(res=>{
      this.updatemsg = "Address updated"
    })
  }

}
