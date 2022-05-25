import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PopoverRef } from 'src/app/overlay/popoverRef';
import { OverlayService } from '../../../overlay/overlay.service';
import { SearchService } from '../../search.service';
import { ControlMeta } from './models';

@Component({
  selector: 'ghs-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  private _popoverRef: PopoverRef | undefined;


  public get activeControls(): ControlMeta[] {
    return this._searchService.advancedSearchControls.active;
  }

  public get inactiveControls(): ControlMeta[] {
    return this._searchService.advancedSearchControls.inactive;
  }

  public get form(): FormGroup {
    return this._searchService.advancedSearchForm;
  }

  public constructor(
    private readonly _overlayService: OverlayService,
    private readonly _overlay: Overlay,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _searchService: SearchService
  ) { }

  public triggerMenu(button: HTMLElement, templateRef: TemplateRef<any>): void {
    const origin = this._viewContainerRef.element.nativeElement;

    const config = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(button)
        .withPositions([
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top'
          }
        ])
    });

    this._popoverRef = this._overlayService.open({
      origin,
      content: templateRef,
      config,
      data: {}
    });
  }

  public getFormGroup(path: string): FormGroup {
    return this.form.get(path) as FormGroup;
  }

  public activateControl(controlMeta: ControlMeta): void {
    this._searchService.activateControl(controlMeta);
    this._popoverRef?.close();
  }

  public deactivateControl(controlMeta: ControlMeta): void {
    this._searchService.deactivateControl(controlMeta);
  }

}
