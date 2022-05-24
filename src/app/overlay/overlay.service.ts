import { Component, ComponentRef, Injectable, Injector, OnDestroy, Type } from '@angular/core';
import { Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { PopoverParams } from './overlay.model';
import { PopoverRef } from './popoverRef';
import { Subject, takeUntil } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopoverComponent } from './popover/popover.component';

@Injectable()
export class OverlayService implements OnDestroy {
    private readonly _unsubscribe = new Subject<void>();

    public constructor(
        private readonly _overlay: Overlay,
        private readonly _injector: Injector
    ) { }

    public open<T>({
        origin,
        content,
        config,
        data
    }: PopoverParams<T>): PopoverRef<T | undefined> {
        const overlayRef = config ? this._overlay.create(config) : this._overlay.create(this.getDefaultOverlayConfig());

        const popoverRef = new PopoverRef(
            overlayRef,
            content,
            data,
            origin
        );

        const injector = this.createInjector(popoverRef, this._injector);

        overlayRef.attach(new ComponentPortal(PopoverComponent, null, injector));

        popoverRef.afterClosed$.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            this._unsubscribe.complete();
            overlayRef.detach();
            overlayRef.dispose();
        });

        return popoverRef;
    }

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    public getDefaultPositionStrategy(overlay: Overlay): PositionStrategy {
        return overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
    }

    public createInjector(popoverRef: PopoverRef, injector: Injector) {
        return Injector.create({
            providers: [{ provide: PopoverRef, useValue: popoverRef }],
            parent: injector
        });
    }

    private getDefaultOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: true,
            positionStrategy: this.getDefaultPositionStrategy(this._overlay),
            scrollStrategy: this._overlay.scrollStrategies.reposition()
        });
    }

}