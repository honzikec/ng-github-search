import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { PopoverCloseEvent, PopoverCloseType, PopoverContent } from './overlay.model';

export class PopoverRef<T = any> {
    private readonly _afterClosed = new Subject<PopoverCloseEvent<T | undefined>>();

    public afterClosed$ = this._afterClosed.asObservable();

    public constructor(
        public overlay: OverlayRef,
        public content: PopoverContent,
        public data: T,
        public origin: HTMLElement
    ) {
        this.overlay.backdropClick().subscribe(() => {
            this.closePopover('backdropClick', this.data);
        });
    }

    public close(data?: T): void {
        this.closePopover('close', data)
    }

    private closePopover(type: PopoverCloseType, data?: T): void {
        this.overlay.dispose();
        this._afterClosed.next({
            type,
            data
        });
        this._afterClosed.complete();
    }

}