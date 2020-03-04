import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { extractTransformPosition } from './extractTransformPosition';

@Directive({
	selector: '[app-lock-scroll-vertical]'
})
export class LockScrollVerticalDirective {
	private static readonly className: string = 'is-vertical-translated';
	public constructor(private _containerElement: ElementRef<HTMLElement>, private renderer: Renderer2) { }

	public reverseScroll(deltaHeight: number): void {
		const [xTransform, yTransform] = extractTransformPosition(this._containerElement.nativeElement);

		this.renderer.setStyle(this._containerElement.nativeElement, 'transform', `translate(${xTransform}px, ${deltaHeight}px)`);

		const elemHaveClass = this._containerElement.nativeElement.classList.contains(LockScrollVerticalDirective.className);

		if (deltaHeight) {
			if (!elemHaveClass) {
				this._containerElement.nativeElement.classList.add(LockScrollVerticalDirective.className);
			}
		} else {
			if (elemHaveClass) {
				this._containerElement.nativeElement.classList.remove(LockScrollVerticalDirective.className);
			}
		}
	}
}
