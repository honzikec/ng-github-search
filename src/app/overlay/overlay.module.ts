import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayService } from './overlay.service';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [
    PopoverComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [
    OverlayService
  ],
  exports: [
    PopoverComponent
  ]
})
export class GhsOverlayModule { }