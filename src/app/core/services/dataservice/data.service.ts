import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseAPIService } from '../baseApiService/base-api-service.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService  extends BaseAPIService{


  matDialogData$ = new BehaviorSubject({});

  baseUrl = environment.baseURL;
  private httpClient: HttpClient;
  constructor(http: HttpClient,
    private handler:HttpBackend
  ) {
    super(http)
    this.httpClient = new HttpClient(this.handler);
  }

  // httpheader = {
  //   'content-type': 'application/json; charset=utf-8',
  //   'X-API-Key':
  //     'Bp9CdPRjzCJtC5smo1OIYzVSR1THGiAtoAeumuC1ryRrUzO42x3YsuguHo5sCbgC',
  // };

  // requestOptions = {
  //   headers: new HttpHeaders(this.httpheader),
  // };

  // Moralis(url: any) {
  //   this.spinner.show();
  //   const promise = new Promise((resolve, reject) => {
  //     this.http
  //       .get(url, this.requestOptions)
  //       .toPromise()
  //       .then(
  //         (data: any) => {
  //           this.spinner.hide();
  //           resolve(data);
  //         },
  //         (err:any) => {
  //         this.spinner.hide();

  //           reject(err);
  //         }
  //       )
  //       .catch((err:any) => {
  //         this.spinner.hide();

  //         console.log(err);
  //       });
  //   });

  //   return promise;
  // }
  Moralis(url: any):Observable<any> {
   return this.http.get(url)
  }

  // getRequest(url: any) {
  //   this.spinner.show();
  //   const promise = new Promise((resolve, reject) => {
  //     this.http
  //       .get(this.baseUrl+url, this.requestOptions)
  //       .toPromise()
  //       .then(
  //         (data: any) => {
  //           this.spinner.hide();
  //           resolve(data);
  //         },
  //         (err) => {
  //         this.spinner.hide();

  //           reject(err);
  //         }
  //       )
  //       .catch((err) => {
  //         this.spinner.hide();

  //         console.log(err);
  //       });
  //   });

  //   return promise;
  // }

  getRequest(url: any):Observable<any> {

   return this.get(url)
  }

  // getRequestWithoutHeader(url :any){
  //   this.spinner.show();
  //   const header ={};
  //   const promise = new Promise((resolve,reject)=>{
  //     this.http.get(url, { headers: new HttpHeaders(header) }).toPromise().then(
  //       (data :any)=>{
  //         this.spinner.hide();
  //         resolve(data);
  //       },(err)=>{
  //         this.spinner.hide();

  //         reject(err);
  //       }
  //     ).catch(
  //       (err)=>{
  //         this.spinner.hide();

  //         console.log(err);

  //       }
  //     )
  //   });

  //   return promise;
  // }
  getRequestWithoutHeader(url :any):Observable<any>{
    return this.httpClient.get(url)
  }


  // postRequest(url :any, body :any){
  //   this.spinner.show();
  //   const promise = new Promise((resolve,reject)=>{
  //     this.http.post(this.baseUrl+url,body).toPromise().then(
  //       (data)=>{
  //         this.spinner.hide();
  //         resolve(data);
  //       },(err)=>{
  //         this.spinner.hide();

  //         reject(err);
  //       }
  //     ).catch(err=>{
  //       this.spinner.hide();

  //         reject(err);
  //     })
  //   });

  //   return promise;
  // }
  postRequest(body: any, url: any): Observable<any>{
    console.log(body);
    
    return this.post(body,url)
  }
}
