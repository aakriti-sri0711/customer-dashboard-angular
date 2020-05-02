import { Component, OnInit , Inject, Input} from '@angular/core';
import { Config } from './../../configapi';
import { ApiTalkService } from './../../services/api-talk.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogueComponent} from '../../reusable/dialogue/dialogue.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
 @Input() public customer_id
  public address
  // simpleDialog: MatDialogRef<DialogueComponent>;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog, public apiTalk:ApiTalkService) {}
  ngOnInit() {
    
    this.customer_id = JSON.parse(localStorage.getItem('currentuser')).id;
    this.get()
  }
  get(){
    this.apiTalk.getData(Config.API_URL+"/customer/"+this.customer_id+"/address")
    .then(result => {
      console.log(result)
      if(result['status'] == 200){
        this.address = result['json']
      }
    })
  }
  openDialog(address): void {
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '30%';
    dialogConfig.panelClass = "dialog-toolbar";
    dialogConfig.position = {
      'top': '0',
      'left': '0'
  };
    dialogConfig.data = {
      address_line1: address.address_line1,
      address_line2: address.address_line2,
      city: address.ckity,
      id: address.id,
      landmark: address.landmark,
      name: address.name,
      phone_number: address.phone_number,
      pincode: address.pincode,
      state_id: address.state_id
    };


    const dialogRef = this.dialog.open(DialogueComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}




 
 

