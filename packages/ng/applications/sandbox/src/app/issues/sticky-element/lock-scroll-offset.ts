import { ElementRef } from "@angular/core";

export class LockScrollOffset {
	public get offsetTop(): number {
		const rect = this._containerElement.nativeElement.getBoundingClientRect();
		return rect.top + window.pageYOffset - document.documentElement.clientTop;
	}

	public get offsetLeft(): number {
		const rect = this._containerElement.nativeElement.getBoundingClientRect();
		return rect.left + window.pageXOffset - document.documentElement.clientLeft;
	}

	public get elementWidth(): number {
		const rect = this._containerElement.nativeElement.getBoundingClientRect();
		return rect.width;
	}
	public constructor(protected _containerElement: ElementRef<HTMLElement>) { }
}
