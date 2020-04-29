import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiTalkService } from '../../services/api-talk.service';
import { Config } from '../../configapi';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  public sub
  public order_id
  public invoices
  public array = []
  public url
  public urlArr = []
  public makeInvoice = false
  public checkedInvoiceBySupplyId
  public tankupInvoiceData
  public mailStatus
  public success
  public err
  public pdfSrc;
 // public invoiced = new Invoiced();
  public order
  public statusId

  constructor(private route: ActivatedRoute, private apiTalk : ApiTalkService,private router: Router) { 
    this.sub = this.route.params.subscribe(params => {
      this.order_id = params['id'];
   });
  }

  ngOnInit() {
    this.getInvoices()
  }
  getInvoices(){
   // console.log(Config.API_URL + Config.ORDERS_URL + '/'+this.order_id+"/invoices")
    return this.apiTalk.getData(Config.API_URL + Config.ORDERS_URL + '/'+this.order_id+"/invoices")
    .then(async result =>{
      this.invoices = result['json']
     
      let vendor = this.invoices[0].vendor_invoice
      for(let i=0; i < vendor.length; i++){
        this.array.push(vendor[i].location)
      }
      
      let tankup = this.invoices[0].tankup_invoice
      for(let j=0; j < tankup.length; j++){
        this.array.push(tankup[j].location)
      }
     
      for(let k=0; k < this.array.length;k++){
       // console.log(Config.API_URL + Config.ORDERS_URL + '/file-path?path='+this.array[k])
       // await this.apiTalk.getData(Config.API_URL + Config.Legal_entity_url + '/invoice/get-invoice')
       await this.apiTalk.getData('http://13.126.96.232:3009/s3?bucket=invoice.tankup.co.in&filePath='+this.array[k])
        .then(response =>{
         
         console.log(response['json'].data.url)
       
          console.log(this.apiTalk.getPdf(response['json'].data.url)) 
         

        // console.log(this.url)
        this.url = 'http://localhost:4200/assets/css/MLFC20-42983.pdf';
         // this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
          this.urlArr.push(this.url)
          
        })
      }

    })

  }
}
