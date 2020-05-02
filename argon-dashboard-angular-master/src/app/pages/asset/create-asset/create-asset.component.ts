import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Config} from '../../../configapi';
import{ApiTalkService} from '../../../services/api-talk.service';
import{ Router } from '@angular/router';
@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class CreateAssetComponent implements OnInit {
  public assetForm
  public user_id;
  constructor(private apiTalk: ApiTalkService) { }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.getEntities()
    this.getAssetType()
    this.getAssetCompany()
    this.getAssetLocation()
    this.assetForm = new FormGroup({
      number: new FormControl(''),
      legal_entity_id: new FormControl(''),
      asset_type_id: new FormControl(''),
      other_type: new FormControl('', Validators.required),
      asset_company_id: new FormControl(''),
      other_company: new FormControl('', Validators.required),
      maximum_capacity: new FormControl(''),
      asset_maker_number: new FormControl(''),
      location_id: new FormControl(''),
    

    })
  }
  public entity
  getEntities(){
    return this.apiTalk.getData(Config.API_URL+Config.Legal_entity_url+'/cust/'+this.user_id)
    .then(res=>{
      this.entity = res['json'].data
     //console.log(res['json'].data)
    })
  }

  public asset_types
  getAssetType(){
    return this.apiTalk.getData(Config.API_URL+'/asset/type')
    .then(res=>{
      this.asset_types = res['json']
     //console.log(res['json'])
    })
  }
  public asset_company
  getAssetCompany(){
    return this.apiTalk.getData(Config.API_URL+'/asset/company')
    .then(res=>{
      this.asset_company = res['json']
    // console.log(res['json'])
    })
  }

  public location
  getAssetLocation(){
    return this.apiTalk.getData(Config.API_URL+Config.CITY_URL)
    .then(res=>{
      this.location = res['json']
    // console.log(res['json'])
    })
  }
  public checkType = false
  
  checkTypeAsset(id){
    
    if(id.value == 0){
      console.log(true)
      this.checkType = true
    }
    else{
      this.checkType = false
    }
  }
  public companyType= false
  checkCompanyTypeAsset(id){
    if(id.value == 0){
      console.log(true)
      this.companyType = true
    }
    else{
      this.companyType = false
    }
  }
  public loading;
  public msg;
  save(data){
  data['created_by'] = this.user_id
  data['status'] = 1
   
   this.loading = true
    setTimeout(()=>{
      return this. apiTalk.postData(Config.API_URL+'/asset/create', data)
    .then(res=>{
      if(res.status== 200){
          this.loading = false
          this.msg = res['json'].mgs
          console.log(res['json'])
      }
      
    })
    }, 2000)
    console.log(data)
    
  }

}
