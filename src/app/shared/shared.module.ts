import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  imports: [
    CommonModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    FormDebugComponent
  ],
  exports: [
    FormDebugComponent
  ]
})
export class SharedModule { }
