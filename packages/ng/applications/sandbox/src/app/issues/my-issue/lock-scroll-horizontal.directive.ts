import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';
import { extractTransformPosition } from './extractTransformPosition';

enum LockScrollHorizontalPosition {
  Left = 'left',
  Right = 'right',
}

@Directive({
  selector: '[app-lock-scroll-horizontal]'
})
export class LockScrollHorizontalDirective implements OnChanges {
  private static readonly classNameLeft: string = 'is-horizontal-translated-left';
  private static readonly classNameRight: string = 'is-horizontal-translated-right';

  private get className(): string {
    switch (this.position) {
      case LockScrollHorizontalPosition.Right:
        return LockScrollHorizontalDirective.classNameRight;
      case LockScrollHorizontalPosition.Left:
      default:
        return LockScrollHorizontalDirective.classNameLeft;
    }
  }

  @Input('app-lock-scroll-horizontal')
  public position: LockScrollHorizontalPosition;

  public constructor(private _containerElement: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes) {
	  if (changes.position) {
		  console.log('Horizontal Position', changes.position.currentValue);
	  }
  }

  public reverseScroll(deltaWidthLeft?: number, deltaWidthRight?: number): void {
    const [xTransform, yTransform] = extractTransformPosition(this._containerElement.nativeElement);

    const appliedDelta = this.getAppliedDelta(deltaWidthLeft, deltaWidthRight);
	console.log('dwl', deltaWidthLeft, 'dwr', deltaWidthRight, 'Applied', appliedDelta);
    this.renderer.setStyle(this._containerElement.nativeElement, 'transform', `translate(${appliedDelta}px, ${yTransform}px)`);

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

  private getAppliedDelta(deltaWidthLeft?: number, deltaWidthRight?: number): number|undefined {
    if (!deltaWidthLeft && !deltaWidthRight) {
      return 0;
    }
    switch (this.position) {
      case LockScrollHorizontalPosition.Right:
        return deltaWidthRight * -1;
      case LockScrollHorizontalPosition.Left:
      default:
        return deltaWidthLeft;
    }
  }
}
