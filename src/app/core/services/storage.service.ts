import { Injectable } from '@angular/core';

// by Guillaume Deblock

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(key:string, data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      let string = this.sanitize(data);
      if (typeof string === 'string') {
        window.localStorage.setItem(key, string);
        resolve(string);
      } else {
        reject();
      }
    });
  }

  get(key:string): Promise<any> {
    return new Promise((resolve, reject) => {
      let value = window.localStorage.getItem(key);      
      if (value) {
        resolve(this.parse(value));
      } else {
        reject();
      }
    });    
  }

  clear(key:string): Promise<void> {
    return new Promise(resolve => {
      window.localStorage.removeItem(key)
      resolve();
    })
  }

  clearStorage (): Promise<void> {
    return new Promise((resolve) => {
      window.localStorage.clear();
      resolve();
    })
  }

  private parse (data:string): { [prop:string]:any } | string {
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }

  private sanitize (data:any): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      return data;
    }
  }

}
