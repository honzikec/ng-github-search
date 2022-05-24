import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverRef } from 'src/app/overlay/popoverRef';
import { OverlayService } from './../../overlay/overlay.service';
import { ControlMeta } from './models';

@Component({
  selector: 'ghs-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  private _popoverRef: PopoverRef | undefined;
  private _inactiveControls: ControlMeta[] = [
    {
      key: 'repos',
      type: 'number',
      label: 'Number of repos',
      hasQualifier: true,
      control: new FormGroup({
        qualifier: new FormControl('>'),
        value: new FormControl(0, [Validators.min(0)])
      })
    },
    {
      key: 'location',
      type: 'text',
      label: 'Location',
      control: new FormControl('')
    },
    {
      key: 'language',
      type: 'text',
      label: 'Programming language',
      control: new FormControl('')
    },
    {
      key: 'created',
      type: 'date',
      label: 'Created date',
      hasQualifier: true,
      control: new FormGroup({
        qualifier: new FormControl('>'),
        value: new FormControl(this.formatDate(new Date()))
      })
    },
    {
      key: 'followers',
      type: 'number',
      label: 'Number of followers',
      hasQualifier: true,
      control: new FormGroup({
        qualifier: new FormControl('>'),
        value: new FormControl(0, [Validators.min(0)])
      })
    },
    {
      key: 'sponsorable',
      type: 'checkbox',
      label: 'Sponsorable',
      control: new FormControl(true)
    }
  ];

  private _activeControls: ControlMeta[] = [];

  private _form: FormGroup = new FormGroup({
    type: new FormControl(''),
    in: new FormControl(['username', 'email']),
    exactMatch: new FormControl(false)
  });

  public get activeControls(): ControlMeta[] {
    return this._activeControls;
  }

  public get inactiveControls(): ControlMeta[] {
    return this._inactiveControls;
  }

  public get form(): FormGroup {
    return this._form;
  }

  public constructor(
    private _overlayService: OverlayService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    // this._availableControls.addControl
    // this.form.removeControl()
    // this.form.get('created.value')?.valueChanges.subscribe(val => {
    //   console.log(val);
    // });
  }

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
    this._inactiveControls = this._inactiveControls.filter(ctrl => ctrl !== controlMeta);
    this._activeControls.push(controlMeta);
    this._form.addControl(controlMeta.key, controlMeta.control);
    this._popoverRef?.close();
  }

  public deactivateControl(controlMeta: ControlMeta): void {
    this._activeControls = this._activeControls.filter(ctrl => ctrl !== controlMeta);
    this._inactiveControls.push(controlMeta);
    this._form.removeControl(controlMeta.key);
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}`;
  }

}
