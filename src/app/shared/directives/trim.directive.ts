import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';

// by Guillaume

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective implements OnInit, OnDestroy {
  
  private delay:number = 500;

  destroy:Subject<void> = new Subject();

  @Input('appTrim')
  appTrim:FormControl

  @Input('appTrimDelay')
  set appTrimDelay (value:number) {
    if (typeof value === 'number') {
      this.delay = value;
    }
  }

  constructor() { }

  ngOnInit() {
    this.appTrim.valueChanges.pipe(
      debounceTime(this.delay),      
      map(value => value.trim()),
      takeUntil(this.destroy)
    ).subscribe((value:string) => {
      this.appTrim.setValue(value)
    });
  }

  ngOnDestroy() {    
    this.destroy.next();
    this.destroy.complete();
  }

}