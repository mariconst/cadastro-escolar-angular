import { Directive, Renderer2, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[validaCpf]'
})
export class ValidaCpfDirective {

  cpf: string;
  constructor(private _elementRef: ElementRef ,private _renderer: Renderer2) {}

  @HostListener('blur')
  onblur(){
    this.cpf = this._elementRef.nativeElement.value;
    if(!this.checkCPF(this.cpf)){
      this._renderer.removeClass(this._elementRef.nativeElement, 'ng-valid');
      this._renderer.addClass(this._elementRef.nativeElement, 'is-invalid');
      this._renderer.addClass(this._elementRef.nativeElement, 'ng-invalid');
      console.log('a');
    }else{
      this._renderer.removeClass(this._elementRef.nativeElement, 'is-invalid');
      this._renderer.removeClass(this._elementRef.nativeElement, 'ng-invalid');
      this._renderer.addClass(this._elementRef.nativeElement, 'ng-valid');
    }   
  }

  checkCPF(cpf){
    var Soma;
    var Resto;
    var i;
    Soma = 0;
    if (cpf == "00000000000") return false;
      
    for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(cpf.substring(9, 10)) ) return false;
    
    Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
      return true;
  }

}
