import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Config} from '../../../configapi';
import{ApiTalkService} from '../../../services/api-talk.service';
import{ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  public loading;
  public addressForm;
  public address_id;
  public address;
  public citiesList;
  public citySelected;
  public states;
  public updated;
  constructor(private formBuilder: FormBuilder, private api: ApiTalkService, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.activated.params.subscribe(params=>{
      this.address_id = params.id
    })
    this.getState()
    this.getCity()
    this.get()
    this.addressForm = new FormGroup({
      name: new FormControl(''),
     
      phone_number: new FormControl(''),
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      pincode: new FormControl(''),
     
      
     
     
    });
   
  
    }
    getState(){
      return this.api.getData(Config.API_URL+Config.STATE_URL)
      .then(res=>{
        this.states = res['json']
        console.log(this.states)
      })
    }
  getCity(){
    return this.api.getData(Config.API_URL+ Config.CITY_URL)
    .then(cities=>
      {
        this.citiesList = cities['json']
      })
  }
  get(){
     return this.api.getData(Config.API_URL+'/address/'+this.address_id)
     .then(result=>{
      this.address = result['json'].data
      for(const key of Object.keys(this.citiesList)){
       if(this.citiesList[key].name.toUpperCase() == this.address.city.toUpperCase() || this.citiesList[key].id == this.address.city){
        this.citySelected = this.citiesList[key].id;
       }
      }
      this.addressForm.get('name').setValue( this.address.name)
      this.addressForm.get('phone_number').setValue( this.address.phone_number)
      this.addressForm.get('address_line1').setValue( this.address.address_line1)
      this.addressForm.get('address_line2').setValue( this.address.address_line2)
      this.addressForm.get('pincode').setValue( this.address.pincode)
      this.addressForm.get('city').setValue( this.citySelected)
      this.addressForm.get('state').setValue(1)
      
     })
  }
  cityChange(){
  
    this.addressForm.get('state').setValue(1)
  }
  save(data){
    this.loading= true;
    setTimeout( () => { return this.api.putData(Config.API_URL+'/address/'+this.address_id, data)
    .then(res=>{
      this.loading = false;
      this.updated= true;
        console.log('updated success')
    })}, 3000 );
    
  }
  close(){
    this.updated = false;
  }

}
