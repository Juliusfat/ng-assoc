import { Injectable } from '@angular/core';

// by Guillaume Deblock

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Save info in localstorage
   * @param string key 
   * @param any data
   * @returns Promise<any>
   */
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

  /**
   * Get data from localstorage for a given key
   * @param string key 
   * @returns Promise<any>
   */
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

  /**
   * Delete data from localstorage for a given key
   * @param key 
   * @returns Promise<void>
   */
  clear(key:string): Promise<void> {
    return new Promise(resolve => {
      window.localStorage.removeItem(key)
      resolve();
    })
  }

  /**
   * Clear all the localstorage
   * @returns Promise<void>
   */
  clearStorage (): Promise<void> {
    return new Promise((resolve) => {
      window.localStorage.clear();
      resolve();
    })
  }

  /**
   * Private method that parses data return parsed json
   * @param string data 
   */
  private parse (data:string): { [prop:string]:any } | string {
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }

  /**
   * Private method that return a string value ready to be
   * store in the localstorage
   * @param any data 
   */
  private sanitize (data:any): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      return data;
    }
  }

}
