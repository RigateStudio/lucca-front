import { Directive, ElementRef } from '@angular/core';
import { LockScrollOffset } from './lock-scroll-offset';

@Directive({
	selector: '[app-lock-scroll-reference-point]'
})
export class LockScrollReferencePointDirective extends LockScrollOffset {
	public constructor(_containerElement: ElementRef<HTMLElement>) {
		super(_containerElement);
	}
}
