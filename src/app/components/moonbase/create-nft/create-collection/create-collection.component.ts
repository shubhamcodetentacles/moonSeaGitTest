import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GetDataService } from 'src/app/services/get-data.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { CreateNftService } from 'src/app/services/create-nft.service';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ContractService } from 'src/app/services/contract.service';
import { ModalForCreateNftComponent } from '../modal-for-create-nft/modal-for-create-nft.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import blockjson from '../../../../../assets/blockchainjson/blockchain.json';
import { environment } from 'src/environments/environment';
import { ModelForCreateCollectionComponent } from '../../collections/model-for-create-collection/model-for-create-collection.component';


@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss'],
})
export class CreateCollectionComponent implements OnInit {
  @ViewChild('ejDatePicker') ejDatePicker: DatePickerComponent | undefined;
  public targetElement: HTMLElement | undefined;

  isApiLoading: boolean = false;
  isSubmitted = false;
  Address: any;
  categotyList: any;
  collectionId: any;
  imagePath: any = '';
  collectionDetails = 1;
  socialLinks = false;
  nftDetails = false;
  dateValue: Date = new Date();
  typeOfNft: any = 'single';
  step01Form: FormGroup;
  step02Form: FormGroup;
  step03Form: FormGroup;
  step04Form: FormGroup;
  imageErrorMsg: boolean;
  addCollectionForm_New: any = {
    tokenName: null,
    walletAddress: null,
    fileUrl: null,
    collectionCoverPhoto: null,
    description: null,
    categoryId: null,
    yourSite: null,
    discord: null,
    twitter: null,
    instagram: null,
    medium: null,
    telegram: null,
    royalties: null,
    nftDefaultDescription: null,
    putOnSale: null,
    typeOfSale: null,
    minimunBid: null,
    startDate: null,
    endDate: null,
    openForBid: null,
    propertysize: [],
    nftAddress: null,
    isMultiple: null,
    nftId: null,
    blockchainId: null
  }
  blockchainList: any = [];
  signature: any;
  blockchainInfo: any = {};

  isApiLoadingForSkip:boolean;
  isImported:boolean=false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private createNFT: CreateNftService,
    private getDataService: GetDataService,
    private formbuider: FormBuilder,
    private cs: ContractService,
    public datepipe: DatePipe,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
  ) { }

  imageUrl = '';
  isSuccess = false;

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.Address = localStorage.getItem('address');
    this.signature = sessionStorage.getItem('createCollectionSignature');
    this.getCategotyList();
    this.collectionId = this.data.collectionId;
    this.getBlockchainList();

    this.step01Form = this.formbuider.group({
      tokenName: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.step02Form = this.formbuider.group({
      yourSite: [''],
      discord: [''],
      twitter: [''],
      instagram: [''],
      medium: [''],
      telegram: [''],
    });

    this.step03Form = this.formbuider.group({
      royalties: [
        5,
        [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]{1,2}?$')],
      ],
      categoryId: ['1', [Validators.required]],
      royaltiesWalletAddress: ['', [Validators.required]],
      blockchainId: ['1'],
      isMultiple: [false]
    });




    blockjson[environment.configFile].forEach(element => {
      if (element.blockchainId == this.step03Form.controls.blockchainId.value) {
        this.blockchainInfo = element;
      }
    });

    this.step03Form.get('blockchainId')?.valueChanges.subscribe((res: any) => {
      blockjson[environment.configFile].forEach(element => {
        if (element.blockchainId == res) {
          this.blockchainInfo = element;
        }
      });
    })


    this.step04Form = this.formbuider.group({
      nftDefaultDescription: ['',],
      propertysize: this.formbuider.array([this.addpropertysize010()]),
      putOnSale: [false],
      typeOfSale: ['1'],
      minimunBid: [''],
      startDate: [''],
      endDate: [''],
      numberOfCopies: [1],
      nftDefaultTitle: ['',],
      noOfDaysAuction: [3]
    });





    this.step04Form.get('putOnSale')?.valueChanges.subscribe((value) => {
      this.setTypeOfSale();
    });

    this.step04Form
      .get('typeOfSale')
      ?.valueChanges.subscribe((value) => {
        this.setTypeOfSale();
      });


    this.step01Form.get('tokenName').valueChanges.subscribe((value: any) => {
      this.checkCollectionName(value);
    })




    if (this.collectionId) {
      this.isApiLoading = true;
      let url = 'api/getCollectionDetails?collectionId=' + this.collectionId;
      this.getDataService.getRequest(url).subscribe((res: any) => {
        if (res.status == 200) {
          this.imagePath = res.data.fileUrl;
          this.isImported = res.data.isImported;
          this.step01PatchValue(res.data);
          this.step02PatchValue(res.data);
          this.step03PatchValue(res.data);
          this.step04PatchValue(res.data);
          this.isApiLoading = false;
        } else {
          this.isApiLoading = false;
        }
      }, (err: any) => {
        this.isApiLoading = false;
      });
    }
  }


  openthecreatecollectionModal() {
    const dialogRef = this.dialog.open(ModelForCreateCollectionComponent, { width: 'auto', data: {} });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  get step01FormControls() {
    return this.step01Form.controls;
  }

  get step02FormControls() {
    return this.step02Form.controls;
  }

  get step03FormControls() {
    return this.step03Form.controls;
  }

  get step04FormControls() {
    return this.step04Form.controls;
  }

  
  get propertysize01(): FormArray {
    return this.step04Form.controls['propertysize'] as FormArray;
  }

  addpropertysize() {
    this.propertysize01.push(this.addpropertysize010());
  }

  addpropertysize010() {
    return this.formbuider.group({
      properties: [''],
      size: [''],
    });
  }

  deletepropertysize01(lessonIndex: number) {
    this.propertysize01.removeAt(lessonIndex);
  }

  toggleTypeOfNft() {
    if (this.step01Form.value.typeOfNft) {
      this.typeOfNft = 'multiple';
      this.step04Form.get('numberOfCopies').setValidators([Validators.required]);
    }
    else {
      this.typeOfNft = 'single';
      this.step04Form.get('numberOfCopies').clearValidators();
      this.step04Form.get('numberOfCopies').updateValueAndValidity();

    }

  }



  step01PatchValue(data: any) {

   
    this.step01Form.patchValue({
      tokenName: data.tokenName,
      description: data.description,
    })
  }

  step02PatchValue(data: any) {
    this.step02Form.patchValue({
      yourSite: data.yourSite,
      discord: data.discord,
      twitter: data.twitter,
      instagram: data.instagram,
      medium: data.medium,
      telegram: data.telegram,
    })
  }

  step03PatchValue(data: any) {
    this.step03Form.patchValue({
      royalties: data.royalties,
      categoryId: data.categoryId,
      royaltiesWalletAddress: data.walletAddress,
      isMultiple: data.isMultiple,
      blockchainId: data.blockchainId
    })
  }

  step04PatchValue(data: any) {
    this.step04Form.patchValue({
      nftDefaultDescription: data.nftDefaultDescription,
      putOnSale: data.putOnSale,
      typeOfSale: data.typeOfSale ? data.typeOfSale?.toString() : 1,
      minimunBid: data.minimunBid,
      startDate: data.stratDate,
      endDate: data.endDate,
      numberOfCopies: data.numberOfCopies,
      nftDefaultTitle: data.nftDefaultTitle,
      noOfDaysAuction: data.noOfDaysAuction
    });


    let data01 = data.propertysize;
    (this.step04Form.controls.propertysize as FormArray).clear();
    data01.forEach((element: any) => {
      (this.step04Form.controls.propertysize as FormArray).push(
        this.formbuider.group({
          properties: element.properties,
          size: element.size,
        })
      );
    });
  }



  saveStep01(value: any) {

    this.imageErrorMsg = false;

    if (this.step01Form.valid) {
      if (this.imagePath) {
        this.addCollectionForm_New.tokenName = this.step01Form.value.tokenName;
        this.addCollectionForm_New.description = this.step01Form.value.description;
        this.collectionDetailsFunc();
      } else {
        this.imageErrorMsg = true;
      }

    }
  }

  saveStep02(value: any) {
    if (this.step02Form.valid) {
      this.addCollectionForm_New.yourSite = this.step02Form.value.yourSite;
      this.addCollectionForm_New.discord = this.step02Form.value.discord;
      this.addCollectionForm_New.twitter = this.step02Form.value.twitter;
      this.addCollectionForm_New.instagram = this.step02Form.value.instagram;
      this.addCollectionForm_New.medium = this.step02Form.value.medium;
      this.addCollectionForm_New.telegram = this.step02Form.value.telegram;

      this.collectionDetailsFunc();
    }
  }
  saveStep03(value: any) {
    if (this.step03Form.valid) {
      this.addCollectionForm_New.royalties = this.step03Form.value.royalties;
      this.addCollectionForm_New.categoryId = this.step03Form.value.categoryId;
      this.addCollectionForm_New.royaltiesWalletAddress = this.step03Form.value.royaltiesWalletAddress;
      this.addCollectionForm_New.blockchainId = this.step03Form.value.blockchainId;
      this.addCollectionForm_New.isMultiple = this.step03Form.value.isMultiple;

      this.collectionDetailsFunc();
    }
  }

  saveStep04(value: any) {
    if (this.step04Form.valid) {
      this.addCollectionForm_New.nftDefaultDescription = this.step04Form.value.nftDefaultDescription;
      this.addCollectionForm_New.propertysize = this.step04Form.value.propertysize;
      this.addCollectionForm_New.putOnSale = this.step04Form.value.putOnSale;
      this.addCollectionForm_New.numberOfCopies = this.step04Form.value.numberOfCopies;
      this.addCollectionForm_New.nftDefaultTitle = this.step04Form.value.nftDefaultTitle;
      this.addCollectionForm_New.noOfDaysAuction = this.step04Form.value.noOfDaysAuction;

      if (this.step04Form.value.putOnSale) {
        this.addCollectionForm_New.minimunBid = this.step04Form.value.minimunBid;
      } else {
        this.addCollectionForm_New.minimunBid = 0;
      }


      this.addCollectionForm_New.typeOfSale = this.step04Form.value.typeOfSale;
      this.addCollectionForm_New.startDate = this.datepipe.transform(
        this.step04Form.controls.startDate.value,
        'yyyy-MM-ddTHH:mm:ss'
      );
      // this.addCollectionForm_New.endDate = this.datepipe.transform(
      //   this.step04Form.controls.endDate.value,
      //   'yyyy-MM-ddTHH:mm:ss'
      // );

      this.addCollectionForm_New.nftAddress = this.step03Form.value.isMultiple ? this.cs.getAddressMultiple(this.addCollectionForm_New.blockchainId) : this.cs.getAddressSingle(this.addCollectionForm_New.blockchainId);

      this.addCollectionForm_New.fileUrl = this.imagePath;
      this.addCollectionForm_New.nftId = this.data.ID;
      this.addCollectionForm_New.walletAddress = this.Address;
      this.addCollectionForm_New.signature = this.signature;
      this.saveCollection(this.addCollectionForm_New);


    }
  }

  saveCollection(data: any) {


    this.isApiLoading = true;
    this.isSubmitted = true;

    if (!this.collectionId) {
      this.createNFT.addCollection(data).subscribe(async (result: any) => {
        if (result.isSuccess) {

          setTimeout(() => {
            this.createNFT.subject.next({ tabIndex: 2 ,collectionName:this.step01Form.value.tokenName,collectionId:result.data.collectionId});
            // this._router.navigate(['/collection'], {
            //   queryParams: {
            //     collectionName: this.addCollectionForm_New.tokenName,
            //     collectionId: result.data.collectionId,
            //   },
            //   queryParamsHandling: 'merge',
            // });
            this.isApiLoading = false;
            this.dialogRef.close();
            this.getDataService.showToastr(result.message, result.isSuccess);
          }, 5000)

        }
        this.isSuccess = result.isSuccess;


      });
    } else {
      let url = 'api/updateCollectionSave';
      this.createNFT.postRequest(url, data).subscribe(async (res: any) => {
        if (res.status == 200) {



          setTimeout(() => {
            if(this.isImported){
              this._router.navigate(['/collection',this.step01Form.value.tokenName])
            }else{
              this.createNFT.subject.next({ tabIndex: 2 ,collectionName:this.step01Form.value.tokenName,collectionId:this.collectionId});
            }
            // this._router.navigate(['/collection'], {
            //   queryParams: {
            //     collectionName: this.addCollectionForm_New.tokenName,
            //     collectionId: this.collectionId,
            //   },
            //   queryParamsHandling: 'merge',
            // });
            this.isApiLoading = false;
            this.dialogRef.close();
            this.getDataService.showToastr(res.message, res.isSuccess);
          }, 5000);

        } else {
          this.getDataService.showToastr(res.message, res.isSuccess);
          this.isApiLoading = false;
        }
      });
    }

  }
  delay(ms: any) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
  async skip() {

    this.isApiLoadingForSkip = true;
    setTimeout(() => {
      if(this.isImported){
        this._router.navigate(['/collection',this.step01Form.value.tokenName])
      }else{
      this.createNFT.subject.next({ tabIndex: 2 ,collectionName:this.step01Form.value.tokenName,collectionId:this.collectionId});
      }
     
      this.dialogRef.close();
      this.isApiLoadingForSkip = false;

    }, 5000)

  }

  close(): void {
    this.dialogRef.close();
  }

  onLogoFile(event: any) {
    this.imagePath = '';
    this.imageErrorMsg = false;
    let file: File = event.target.files[0];


    if (file && (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/webp')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      this.createNFT.uploadFile(file).subscribe(
        (response: any) => {
          let data = response;

          if (response.type === HttpEventType.UploadProgress) {
          } else if (response instanceof HttpResponse) {
            if (response.body.isSuccess) {
              this.imageErrorMsg = false;
              this.imagePath = response.body.data.path;
            } else {
              this.imageErrorMsg = true;
              this.imagePath = '';
            }
          }
        },
        (error: any) => {
          this.imageErrorMsg = true;
          this.imagePath = '';
        }
      );
    }
  }

  getCategotyList() {
    this.createNFT.getCategotyList().subscribe((response: any) => {
      if (response.isSuccess) {
        this.categotyList = response.data;
      }
    });
  }

  isShowNameValidation: boolean = false;

  checkCollectionName(collection_name: any) {

    let body = {
      collectionName: collection_name
    };

    let url = 'api/checkCollectionNameValidation';
    if (collection_name.length >= 3) {
      this.createNFT.postRequest(url, body).subscribe((res: any) => {
        if (res.status == 200) {
          this.isShowNameValidation = false;
          this.step01Form.controls.tokenName.setErrors(null)
        } else {
          this.isShowNameValidation = true;
          if (!this.collectionId) {
            this.step01Form.controls.tokenName.setErrors({ 'incorrect': true })
          }
        }
      });
    } else {
      this.isShowNameValidation = false;
    }
  }








  collectionDetailsFunc() {
    this.collectionDetails++;
  }

  prev() {
    this.collectionDetails--;
  }

  openDialogSubmitNFT(data: any): void {
    const dialogRef = this.dialog.open(ModalForCreateNftComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        details: data,
        globalService: this.cs,
        typeOfNft: this.typeOfNft,
      },
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }

  checkValidaation(value: any) {
    if (parseInt(value) > 0) {
      this.step03Form.controls.royaltiesWalletAddress.setValidators([Validators.required]);
      this.step03Form.controls.royaltiesWalletAddress.updateValueAndValidity();

    }
    else {
      this.step03Form.get('royaltiesWalletAddress').clearValidators();
      this.step03Form.get('royaltiesWalletAddress').updateValueAndValidity();
    }

  }

  setTypeOfSale() {


    if (this.step04Form.get('putOnSale')?.value) {
      if (this.step04Form.get('typeOfSale')?.value == 1) {
        this.step04Form
          .get('minimunBid')
          ?.setValidators(Validators.required);

        this.step04Form.get('startDate').clearValidators();
        this.step04Form.get('startDate').updateValueAndValidity();
        this.step04Form.get('endDate').clearValidators();
        this.step04Form.get('endDate').updateValueAndValidity();
      }

      if (this.step04Form.get('typeOfSale')?.value == 2) {
        this.step04Form
          .get('minimunBid')
          ?.setValidators(Validators.required);
        this.step04Form
          .get('startDate')
          ?.setValidators(Validators.required);
        this.step04Form
          .get('endDate')
          ?.setValidators(Validators.required);
      }

      if (this.step04Form.get('typeOfSale')?.value == 3) {
        this.step04Form
          .get('minimunBid')
          ?.setValidators(Validators.required);

        this.step04Form.get('startDate').clearValidators();
        this.step04Form.get('startDate').updateValueAndValidity();
        this.step04Form.get('endDate').clearValidators();
        this.step04Form.get('endDate').updateValueAndValidity();
      }
    } else {
      this.step04Form.get('minimunBid').clearValidators();
      this.step04Form.get('minimunBid').updateValueAndValidity();
      this.step04Form.get('startDate').clearValidators();
      this.step04Form.get('startDate').updateValueAndValidity();
      this.step04Form.get('endDate').clearValidators();
      this.step04Form.get('endDate').updateValueAndValidity();
    }
  }

  getBlockchainList() {
    this.createNFT.getBlockchainList().subscribe((response: any) => {
      this.blockchainList = response.data;

    });
  }
}




