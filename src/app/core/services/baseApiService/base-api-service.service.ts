import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class BaseAPIService {
  baseUrl = '';
  constructor(public http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    
    this.baseUrl = environment.baseURL;
    let d = url.search('http')
    if(d!=-1){
      return this.http.get<T>(url);
    }else{
      this.baseUrl += url;
      return this.http.get<T>(this.baseUrl);    }
  }

  post(body: object | string, url: string): Observable<any> {
    
    this.baseUrl = environment.baseURL;
    this.baseUrl += url;
    return this.http.post(this.baseUrl, body);
  }

  delete(url: string): Observable<any> {
    this.baseUrl = environment.baseURL;
    this.baseUrl += url;
    return this.http.delete<any>(this.baseUrl);
  }
  put(body: object | string, url: string): Observable<any> {
    this.baseUrl = environment.baseURL;
    this.baseUrl += url;
    return this.http.put<any>(this.baseUrl, body);
  }
}
