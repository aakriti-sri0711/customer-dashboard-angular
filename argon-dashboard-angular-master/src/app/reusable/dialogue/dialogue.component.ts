import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private route: Router)  { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
    }
    editAddress(id_adrr){
      this.route.navigate(['address/edit/'+id_adrr])
    }
}
