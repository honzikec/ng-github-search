import { Component, Input, HostBinding } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Icon, icons } from './icons.model';


@Component({
  selector: 'ghs-icon',
  templateUrl: 'icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  public iconData: SafeHtml = '';

  @HostBinding('class') sizeModifier = 'size--24';

  @Input()
  public set icon(key: Icon) {
    let icon = icons[key];
    if (icon) {
      this.iconData = this._domSanitizer.bypassSecurityTrustHtml(icon);
    } else {
      console.warn(`Icon ${key} not found!`)
    }
  }

  @Input()
  public set size(px: number) {
    this.sizeModifier = `size--${px}`;
  }

  public constructor(
    private readonly _domSanitizer: DomSanitizer
  ) { }

}
