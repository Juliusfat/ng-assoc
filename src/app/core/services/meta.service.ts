import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { environment } from '../../../environments/environment'

@Injectable()
export class MetaService {

  constructor(private title:Title) { }

  setTitle(title:string): void {    
    this.title.setTitle(`${title} - ${environment.appName}`);
  }
}
