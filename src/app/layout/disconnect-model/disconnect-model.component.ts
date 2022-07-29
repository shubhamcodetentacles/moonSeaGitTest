import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disconnect-model',
  templateUrl: './disconnect-model.component.html',
  styleUrls: ['./disconnect-model.component.scss']
})
export class DisconnectModelComponent implements OnInit {

  constructor(private router :Router ,  public dialogRef: MatDialogRef<DisconnectModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any , private ngZone :NgZone) {  
    }
 
  ngOnInit(): void {
  
  }
  goToHome(){
    
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/')
      this.dialogRef.close()
    })
  }
}
