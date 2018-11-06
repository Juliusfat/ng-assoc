import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

export enum KEY_CODE {
  CONTROL = 17
}

@Directive({
  selector: '[appShowPasswordField]'
})
export class ShowPasswordFieldDirective {

  private delay : number = 1000;
  private elt : HTMLInputElement;
  private currentTimeOut;
  
  constructor(private eltRef : ElementRef, private renderer : Renderer2) { }
  
  ngOnInit(): void {
    this.elt = this.eltRef.nativeElement;
    this.currentTimeOut = null;
    // Add hover instruction to help using of the functionality.
    this.renderer.setAttribute(this.elt, "title", "Appuyez sur Ctrl pour afficher temporairement le mot de passe");
  }

  @HostListener('keydown', ['$event'])
  onkeydown(e) {
    window.clearTimeout(this.currentTimeOut);
    this.currentTimeOut = null;
    // If Ctrl key is pressed, makes the password field visible.
    if (e.keyCode == KEY_CODE.CONTROL) {
      this.renderer.setAttribute(this.elt, "type", "text");
    }
  }
  
  @HostListener('keyup')
  onkeyup() {
    if (!this.currentTimeOut) {
      // When the user stops writing during the delay, hides the field again.
      this.currentTimeOut = setTimeout(() => {
        this.renderer.setAttribute(this.elt, "type", "password");
      }, this.delay);
    }
  }

}
