import { Directive, ElementRef, Renderer2, Input, OnChanges } from '@angular/core';
import { extractTransformPosition } from './extractTransformPosition';

enum LockScrollVerticalPosition {
	Top = 'top',
	Bottom = 'bottom',
}

@Directive({
  selector: '[app-lock-scroll-vertical]'
})
export class LockScrollVerticalDirective implements OnChanges {
  private static readonly classNameTop: string = 'is-vertical-translated-top';
  private static readonly classNameBottom: string = 'is-vertical-translated-bottom';

  private get className(): string {
    switch (this.position) {
      case LockScrollVerticalPosition.Top:
        return LockScrollVerticalDirective.classNameTop;
      case LockScrollVerticalPosition.Bottom:
      default:
        return LockScrollVerticalDirective.classNameBottom;
    }
  }

  @Input('app-lock-scroll-vertical')
  public position: LockScrollVerticalPosition = LockScrollVerticalPosition.Top;

  ngOnChanges(changes) {
	if (changes.position) {
		console.log('Vertical Position', changes.position.currentValue);
	}
}
  public constructor(private _containerElement: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  public reverseScroll(deltaHeightTop?: number, deltaHeightBottom?: number): void {
    const [xTransform, yTransform] = extractTransformPosition(this._containerElement.nativeElement);

    const appliedDelta = this.getAppliedDelta(deltaHeightBottom, deltaHeightTop);
	console.log('dht', deltaHeightTop, 'dhb', deltaHeightBottom, 'Applied', appliedDelta);
    this.renderer.setStyle(this._containerElement.nativeElement, 'transform', `translate(${xTransform}px, ${appliedDelta}px)`);

    const elemHaveClass = this._containerElement.nativeElement.classList.contains(this.className);

    if (appliedDelta) {
      if (!elemHaveClass) {
        this._containerElement.nativeElement.classList.add(this.className);
      }
    } else {
      if (elemHaveClass) {
        this._containerElement.nativeElement.classList.remove(this.className);
      }
    }
  }

  private getAppliedDelta(deltaHeightBottom?: number, deltaHeightTop?: number): number|undefined {
    if (!deltaHeightBottom && !deltaHeightTop) {
      return 0;
    }
    switch (this.position) {
      case LockScrollVerticalPosition.Top:
		  break;
      case LockScrollVerticalPosition.Bottom:
        return deltaHeightBottom * -1;
	default:
        return deltaHeightTop;
    }
  }
}
