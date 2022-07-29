import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  store(key:string,content:any) {
    sessionStorage.setItem(key, content);
  }

  retrieve(key:string) {
    let storedKey: any = sessionStorage.getItem(key);
    if (!storedKey) {
      storedKey='not found';
    };
    return storedKey;
  }

  remove(key:string){
    let storedKey: any = sessionStorage.getItem(key);
    if (!storedKey) {
      return;
    };
    localStorage.removeItem(key);
  }

}
