import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ModalForCreateNftComponent } from 'src/app/components/moonbase/create-nft/modal-for-create-nft/modal-for-create-nft.component';
import { ContractService } from 'src/app/services/contract.service';
import { GetDataService } from 'src/app/services/get-data.service';
import moment from "moment";
import {noOfCopies} from './noOfCopies.validator';
import blockjson from '../../../../../../../assets/blockchainjson/blockchain.json';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-add-edit-nft',
  templateUrl: './add-edit-nft.component.html',
  styleUrls: ['./add-edit-nft.component.scss'],
})
export class AddEditNftComponent implements OnInit, OnDestroy {
  @ViewChild('ejDatePicker') ejDatePicker: DatePickerComponent | undefined;
  public targetElement: HTMLElement | undefined;

  addEditNft: FormGroup;
  dateValue: Date = new Date();
  isApiLoading: boolean;
  typeOfNft: any;
  blockchainInfo:any={};
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditNftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private _getDataService: GetDataService,
    private dialog: MatDialog,
    private cs: ContractService
  ) {}

  ngOnDestroy(): void {
    this.dialogRef.close();
    
  }

  ngOnInit(): void {
    if (this.data.isMultiple) {
      this.typeOfNft = 'multiple';
    } else {
      this.typeOfNft = 'single';
    }

    this.addEditNft = this.fb.group({
      title: [''],
      nftTokenID: [''],
      nftDefaultDescription: ['',],
      propertysize: this.fb.array([this.propertysizeGroup()]),
      putOnSale: [false],
      typeOfSale: ['1'],
      minimunBid: [''],
      startDate: [''],
      // endDate: [''],
      noOfDaysAuction:['3'],
      currentSupply: [''],
      // royalties: ['', [Validators.required,Validators.min(0),Validators.max(10), Validators.pattern('^[0-9]{1,2}?$')]],
      royalties: [''],
      isMultiple: [false],
      nftAddress: [''],
      blockchainId: [''],
      imageUrl: [''],
      numberOfCopies: ['1',[Validators.required,noOfCopies]],
      collectionId: [''],
      asset:['']
    });

    this.addEditNft.get('putOnSale')?.valueChanges.subscribe((value) => {
      this.setTypeOfSale();
    });

    this.addEditNft.get('typeOfSale')?.valueChanges.subscribe((value) => {
      this.setTypeOfSale();
    });

    if (this.data) {
      
      this.addEditNft.patchValue({
        title: this.data.title,
        nftDefaultDescription: this.data.description,
        propertysize: this.data.propertysize,
        putOnSale: this.data.isForSale,
        typeOfSale: this.data.typeOfSale?.toString(),
        minimunBid: this.data.minimunBid,
        startDate: this.data.startingDate,
        // endDate: this.data.expirationDate,
        noOfDaysAuction:this.data.noOfDaysAuction,
        nftTokenID: this.data.nftTokenID,
        currentSupply: this.data.currentSupply,
        royalties: this.data.royalties,
        isMultiple: this.data.isMultiple,
        nftAddress: this.data.nftAddress,
        blockchainId: this.data.blockchainId,
        imageUrl: this.data.fileUrl,
        numberOfCopies: this.data.numberOfCopies,
        collectionId: this.data.collectionId,
        asset:this.data.asset
      });

      (this.addEditNft.controls.propertysize as FormArray).clear();
      this.data.propertysize.forEach((element: any) => {
        (this.addEditNft.controls.propertysize as FormArray).push(
          this.fb.group({
            properties: element.properties,
            size: element.size,
          })
        );
      });
    }


    blockjson[environment.configFile].forEach(element => {
      //debugger
      if(element.blockchainId == this.data.blockchainId){
        this.blockchainInfo = element;
      }
    });

  }

  get formControls() {
    return this.addEditNft.controls;
  }

  get propertysize01(): FormArray {
    return this.addEditNft.controls['propertysize'] as FormArray;
  }

  propertysizeGroup() {
    return this.fb.group({
      size: [''],
      properties: [''],
    });
  }

  addProperies() {
    this.propertysize01.push(this.propertysizeGroup());
  }

  deletepropertysize01(index: any) {
    this.propertysize01.removeAt(index);
  }

  close(): void {
    this.dialogRef.close();
  }

  saveNFT(value: any) {
    this.addEditNft.value.startDate = moment(this.addEditNft.controls.startDate.value).toDate();

    // this.addEditNft.value.endDate =  moment(this.addEditNft.controls.endDate.value).toDate();
    // this.addEditNft.value.startDate = this.datepipe.transform(
    //   this.addEditNft.controls.startDate.value,
    //   'yyyy-MM-ddTHH:mm:ss'
    // );
    // this.addEditNft.value.endDate = this.datepipe.transform(
    //   this.addEditNft.controls.endDate.value,
    //   'yyyy-MM-ddTHH:mm:ss'
    // );
    //debugger
    if (this.data.isMinted) {
      let url = 'api/UpdateNftToken';
      this._getDataService.postRequest(url, this.addEditNft.value).subscribe(
        (res: any) => {
          if (res.status == 200) {
            this._getDataService.showToastr(res.message, res.isSuccess);
            this.close();
          } else {
            this._getDataService.showToastr(res.message, res.isSuccess);
          }
        },
        (err: any) => {
          this._getDataService.showToastr(err, false);
        }
      );
    } else {
      this.openDialogSubmitNFT(this.addEditNft.value);
    }
  }

  openDialogSubmitNFT(data: any): void {
    
    const dialogRef01 = this.dialog.open(ModalForCreateNftComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        details: data,
        globalService: this.cs,
        typeOfNft: this.typeOfNft,
      },
    });

    dialogRef01.afterClosed().subscribe(result => {
      this.dialogRef.close();
    });
  }

  setTypeOfSale() {
    if (this.addEditNft.get('putOnSale')?.value) {
      if (this.addEditNft.get('typeOfSale')?.value == 1) {
        this.addEditNft.get('minimunBid')?.setValidators(Validators.required);
        this.addEditNft.get('startDate')?.clearValidators();
        this.addEditNft.get('startDate')?.updateValueAndValidity();
        // this.addEditNft.get('endDate')?.clearValidators();
        // this.addEditNft.get('endDate')?.updateValueAndValidity();
         this.addEditNft.get('noOfDaysAuction')?.clearValidators();
         this.addEditNft.get('noOfDaysAuction')?.updateValueAndValidity();


      }

      if (this.addEditNft.get('typeOfSale')?.value == 2) {
        this.addEditNft.get('minimunBid')?.setValidators(Validators.required);
        this.addEditNft.get('startDate')?.setValidators(Validators.required);
        // this.addEditNft.get('endDate')?.setValidators(Validators.required);
        this.addEditNft.get('noOfDaysAuction')?.setValidators(Validators.required);
      }

      if (this.addEditNft.get('typeOfSale')?.value == 3) {
        this.addEditNft.get('minimunBid')?.setValidators(Validators.required);

        this.addEditNft.get('startDate')?.clearValidators();
        // this.addEditNft.get('endDate')?.clearValidators();
        this.addEditNft.get('startDate')?.updateValueAndValidity();
        // this.addEditNft.get('endDate')?.updateValueAndValidity();
        this.addEditNft.get('noOfDaysAuction')?.clearValidators();
        this.addEditNft.get('noOfDaysAuction')?.updateValueAndValidity();
      }
    } else {
      this.addEditNft.get('minimunBid')?.clearValidators();
      this.addEditNft.get('startDate')?.clearValidators();
      // this.addEditNft.get('endDate')?.clearValidators();
      this.addEditNft.get('minimunBid')?.updateValueAndValidity();
      this.addEditNft.get('startDate')?.updateValueAndValidity();
      // this.addEditNft.get('endDate')?.updateValueAndValidity();
      this.addEditNft.get('noOfDaysAuction')?.clearValidators();
      this.addEditNft.get('noOfDaysAuction')?.updateValueAndValidity();
    }
  }
}
