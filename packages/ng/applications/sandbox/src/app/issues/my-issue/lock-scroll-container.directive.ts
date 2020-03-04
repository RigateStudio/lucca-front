import { AfterViewInit, ChangeDetectorRef, ContentChild, ContentChildren, Directive, ElementRef, forwardRef, HostListener, QueryList } from '@angular/core';
import { combineLatest } from 'rxjs';
import { LockScrollHorizontalDirective } from './lock-scroll-horizontal.directive';
import { LockScrollOffset } from './lock-scroll-offset';
import { LockScrollReferencePointDirective } from './lock-scroll-reference-point.directive';
import { LockScrollVerticalDirective } from './lock-scroll-vertical.directive';


@Directive({
  selector: '[app-lock-scroll-container]'
})
export class LockScrollContainerDirective extends LockScrollOffset implements AfterViewInit {
  @ContentChild(LockScrollReferencePointDirective, {static: false})
  private referencePoint: LockScrollReferencePointDirective;

  @ContentChildren(forwardRef(() => LockScrollVerticalDirective), { descendants: true })
  private verticalDirectiveList: QueryList<LockScrollVerticalDirective>;

  @ContentChildren(forwardRef(() => LockScrollHorizontalDirective), { descendants: true })
  private horizontalDirectiveList: QueryList<LockScrollHorizontalDirective>;

  public constructor(_containerElement: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
    super(_containerElement);
    setTimeout(() => this.fixElement());
  }

  public ngAfterViewInit(): void {
    combineLatest([
      this.horizontalDirectiveList.changes,
      this.verticalDirectiveList.changes,
    ]).subscribe(() => {
      this.fixElement();
    });
  }

  @HostListener('scroll', ['$event'])
  public onListenerTriggered(event: UIEvent): void {
    this.fixElement();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: UIEvent): void {
    this.fixElement();
  }

  public fixElement(): void {
    if (!this.hasChildReferencePoint()) {
      return ;
    }
    if (this.hasChildrenHeaderDirectives()) {
      // -1 px because we could saw some data under the thead
      const deltaHeight = this.getPositiveDelta(this.offsetTop - this.referencePoint.offsetTop - 1);
      this.verticalDirectiveList.forEach((item) => {
        item.reverseScroll(deltaHeight);
      });
    }

    if (this.hasChildrenColumnDirectives()) {
      const deltawidth = this.getPositiveDelta(this.offsetLeft - this.referencePoint.offsetLeft);
      const deltawidthRight = this.getPositiveDelta(this.referencePoint.elementWidth - this.elementWidth - deltawidth);
      this.horizontalDirectiveList.forEach((item) => {
        item.reverseScroll(deltawidth, deltawidthRight);
      });
    }
  }

  private hasChildReferencePoint(): boolean {
    return !!this.referencePoint;
  }

  private hasChildrenHeaderDirectives(): boolean {
    return !!(this.verticalDirectiveList && this.verticalDirectiveList.length);
  }

  private hasChildrenColumnDirectives(): boolean {
    return !!(this.horizontalDirectiveList && this.horizontalDirectiveList.length);
  }

  private getPositiveDelta(delta: number): number {
    return delta > 0 ? delta : 0;
  }
}
