import { OverlayConfig } from '@angular/cdk/overlay'
import { TemplateRef, Type } from '@angular/core';

export type PopoverContent = TemplateRef<any> | Type<any> | string;

export type PopoverCloseType = 'backdropClick' | 'close';

export type PopoverCloseEvent<T> = {
    type: PopoverCloseType;
    data: T;
}

export type PopoverParams<T> = {
    origin: HTMLElement;
    content: PopoverContent;
    config?: OverlayConfig;
    data?: T;
}