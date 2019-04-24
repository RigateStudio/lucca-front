import { Injectable } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, OriginConnectionPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class LuPopup {
	protected _overlayRef: OverlayRef;
	constructor(
		protected _overlay: Overlay,
	) {}
	open(component) {
		this._createOverlay();
		this._openPopup(component);
	}
	/**
	 * This method builds the configuration object needed to create the overlay, the OverlayConfig.
	 * @returns OverlayConfig
	 */
	protected _getOverlayConfig(): OverlayConfig {
		const overlayConfig = new OverlayConfig();
		overlayConfig.positionStrategy =  this._overlay.position().global().centerHorizontally().centerVertically();
		overlayConfig.hasBackdrop = true;
		overlayConfig.backdropClass = 'cdk-overlay-dark-backdrop';
		overlayConfig.panelClass = 'lu-popup-panel';
		overlayConfig.scrollStrategy = this._overlay.scrollStrategies.block();
		return overlayConfig;
	}
	/**
	 *  This method creates the overlay from the provided popover's template and saves its
	 *  OverlayRef so that it can be attached to the DOM when openPopover is called.
	 */
	protected _createOverlay() {
		if (!this._overlayRef) {

			const config = this._getOverlayConfig();
			this._overlayRef = this._overlay.create(config);
		}
	}
	protected _openPopup(component) {
		const portal = new ComponentPortal(component);
		this._overlayRef.attach(portal);
	}
}
