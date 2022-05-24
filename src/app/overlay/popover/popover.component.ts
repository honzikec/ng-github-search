import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { PopoverRef } from '../popoverRef';

@Component({
  selector: 'ghs-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  private _renderMethod: 'template' | 'component' | 'text' = 'component';
  private _textContent: string | undefined;
  private _component: Type<any> | undefined;
  private _templateRef: TemplateRef<any> | null = null;

  public get renderMethod(): 'template' | 'component' | 'text' {
    return this._renderMethod;
  }

  public get textContent(): string | undefined {
    return this._textContent;
  }

  public get component(): Type<any> | undefined {
    return this._component;
  }

  public get templateRef(): TemplateRef<any> | null {
    return this._templateRef;
  }

  public context: Object | null = null;

  constructor(
    private _popoverRef: PopoverRef
  ) { }

  ngOnInit(): void {
    if (typeof this._popoverRef.content === 'string') {
      this._renderMethod = 'text';
      this._textContent = this._popoverRef.content;
    } else if (this._popoverRef.content instanceof TemplateRef) {
      this._renderMethod = 'template';
      this.context = {
        close: this._popoverRef.close.bind(this._popoverRef)
      };
      this._templateRef = this._popoverRef.content;
    } else if (this._popoverRef.content instanceof Type) {
      this._renderMethod = 'component';
      this._component = this._popoverRef.content;
    }

  }

}
