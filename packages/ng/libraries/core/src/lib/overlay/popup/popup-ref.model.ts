import { Observable, Subject, Subscription, merge } from 'rxjs';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { first, filter } from 'rxjs/operators';
import { ComponentRef } from '@angular/core';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Injector } from '@angular/core';
import { LU_POPUP_DATA } from './popup.token';
import { ILuPopupConfig } from './popup-config.model';
import { ILuPopupContent } from './popup.model';

export interface ILuPopupRef<T extends ILuPopupContent = ILuPopupContent, D = any, R = any> {
	onOpen: Observable<D>;
	onClose: Observable<R>;
	open(data: D): void;
	close(result: R): void;
}
export interface ILuPopupRefFactory<TComponent = any, TConfig extends ILuPopupConfig = ILuPopupConfig> {
	forge<T extends TComponent, C extends TConfig>(component: ComponentType<T>, config: C): ILuPopupRef<T>;
}

export abstract class ALuPopupRef<T extends ILuPopupContent = ILuPopupContent, D = any, R = any> implements ILuPopupRef<T, D, R> {
	onOpen = new Subject<D>();
	onClose = new Subject<R>();

	protected _overlayRef: OverlayRef;
	protected _componentRef: ComponentRef<T>;

	protected _sub: Subscription;

	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		protected _component: ComponentType<T>,
		protected _config: ILuPopupConfig,
	) {}


	open(data?: D) {
		this._createOverlay();
		this._openPopup(data);
		this._subToCloseEvents();

		this.onOpen.next(data);
		this.onOpen.complete();
	}
	close(result?: R) {
		this._cleanSubscription();
		this._closePopup();
		this._destroyOverlay();

		this.onClose.next(result);
		this.onClose.complete();
	}
	/**
	 *  This method creates the overlay from the provided popover's template and saves its
	 *  OverlayRef so that it can be attached to the DOM when openPopover is called.
	 */
	protected _createOverlay() {
		if (!this._overlayRef) {
			const overlayConfig = this._getOverlayConfig();
			this._overlayRef = this._overlay.create(overlayConfig);
		}
	}
		/**
	 * This method builds the configuration object needed to create the overlay, the OverlayConfig.
	 * @returns OverlayConfig
	 */
	protected _getOverlayConfig(): OverlayConfig {
		const overlayConfig = new OverlayConfig();
		switch (this._config.position) {
			case 'center':
			default:
				overlayConfig.positionStrategy =  this._overlay.position().global().centerHorizontally().centerVertically();
				break;
		}
		overlayConfig.hasBackdrop = !this._config.noBackdrop;
		overlayConfig.backdropClass = this._config.backdropClass;
		overlayConfig.panelClass = this._config.panelClass;
		overlayConfig.scrollStrategy = this._overlay.scrollStrategies.block();
		return overlayConfig;
	}
	protected _openPopup(data?: D) {
		const injectionMap = new WeakMap();
		injectionMap.set(ALuPopupRef, this);
		injectionMap.set(LU_POPUP_DATA, data);
		const injector = new PortalInjector(this._injector, injectionMap);
		const portal = new ComponentPortal(this._component, undefined, injector);
		this._componentRef = this._overlayRef.attach<T>(portal);
	}

	protected _destroyOverlay() {
		this._overlayRef.detachBackdrop();
		this._overlayRef.detach();
	}
	protected _closePopup() {
		this._componentRef.destroy();
	}
	protected _subToCloseEvents() {
		const bdClicked$ = this._overlayRef.backdropClick();
		const escPressed$ = this._overlayRef.keydownEvents().pipe(
			filter(evt => evt.keyCode === ESCAPE),
		);
		this._sub = merge(bdClicked$, escPressed$).pipe(first())
		.subscribe(e => this.close(undefined));
	}
	protected _cleanSubscription() {
		this._sub.unsubscribe();
	}
}