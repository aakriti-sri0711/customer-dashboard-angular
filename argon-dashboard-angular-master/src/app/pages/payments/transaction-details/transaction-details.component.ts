import { Component, OnInit, Input, ElementRef, ViewChild,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { stringify } from 'qs'
import { IMyDpOptions} from 'mydatepicker';
import { ApiTalkService } from '../../../services/api-talk.service';
import { Config} from '../../../configapi';
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  @Output('result') outgoingData = new EventEmitter<any>();
  public myDatePickerOptions: IMyDpOptions = { dateFormat: 'yyyy-mm-dd' }
  public customer_id
  public method = 'post'
  public fill =  false
  public click = false 
  public financetype
  public filterQuery = new Query
  public from
  public to
  public queryString
  public invoices
  public payments
  static queryObj = {page : 1, limit : 20}
  public pages
  public invoicepages

  constructor(private route: ActivatedRoute, private apiTalk: ApiTalkService, private router: Router) { }

  async ngOnInit() {
    this.customer_id = JSON.parse(localStorage.getItem('currentuser'));
    TransactionDetailsComponent.queryObj = {page : 1, limit : 20}
    this.financeType()
    this.filter({})
    this.getAllInvoices()
    this.getAllPayments()
  }
  public query = '?'
  public queryFilterString = ''
  financeType(){
    return this.apiTalk.getData(Config.API_URL+"/payment/finance-type")
    .then(result => {
      this.financetype = result['json']
    })
  }

  async filter(obj){

      for(let k in obj){
        TransactionDetailsComponent.queryObj[k] = obj[k]
      }
      if(obj == 'reset' || obj == {}){
        // this.getCustomerBalanceData()
        // return
        TransactionDetailsComponent.queryObj = {page : 1, limit : 20}
      }

      let queryParam = '?'
      let b =stringify(TransactionDetailsComponent.queryObj)
      queryParam = '?'
      queryParam += b

       this.apiTalk.getData(Config.API_URL+"/payment/customer-payment/"+this.customer_id.id+ queryParam)
      .then(result =>{
        this.payments = result['json'].data
        this.pages = result['json'].pages
      })
      await this.apiTalk.getData(Config.API_URL+"/payment/invoices/"+this.customer_id.id+queryParam)
      .then(result =>{
        this.invoices = result['json'].data
        this.invoicepages = result['json'].pages
      })
      
  }
  getAllInvoices(){
    this.query = '?page='+Config.invoicePage+'&limit='+Config.invoiceLimit
    return this.apiTalk.getData(Config.API_URL+"/payment/invoices/"+this.customer_id.id+this.query)
    .then(result =>{
      this.invoices = result['json'].data
      this.invoicepages = result['json'].pages
    })
  }
  getAllPayments(){
    this.query = '?page='+Config.paymentDetailsPage+"&limit="+Config.paymentDetailsLimit
    return this.apiTalk.getData(Config.API_URL+"/payment/customer-payment/"+this.customer_id.id+this.query)
    .then(result =>{
      this.payments = result['json'].data
      this.pages = result['json'].pages
    })
  }
  invoicePagenext(){
    Config.invoicePage++
    this.filter({page : Config.invoicePage})
  }
  invoicePagePrev(){
    if(Config.invoicePage <= 1){
      return
    }
    Config.invoicePage--
    this.filter({page : Config.invoicePage})
  }
  selecInvoicePage(no){
    Config.invoicePage = no
    this.filter({page : Config.invoicePage})
  }



  pageNext(){
    Config.paymentDetailsPage++
    this.filter({page : Config.paymentDetailsPage})
  }

  selecPage(no){
    Config.paymentDetailsPage = no
    this.filter({page : Config.paymentDetailsPage})
  }

  pagePrev(){
    if(Config.paymentDetailsPage <= 1){
      return
    }
    Config.paymentDetailsPage--
    this.filter({page : Config.paymentDetailsPage})
  }

  goBackToTransactionDetails(){
    this.router.navigate(["payment/customer/"+this.customer_id]);
  }
}
class Query {
  finance_type_id:number
  date_added:any
}
class DateAdded {
  $between : Array<string>
}
