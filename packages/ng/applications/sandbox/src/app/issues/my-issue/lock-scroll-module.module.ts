import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LockScrollContainerDirective } from './lock-scroll-container.directive';
import { LockScrollHorizontalDirective } from './lock-scroll-horizontal.directive';
import { LockScrollReferencePointDirective } from './lock-scroll-reference-point.directive';
import { LockScrollVerticalDirective } from './lock-scroll-vertical.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LockScrollContainerDirective, LockScrollReferencePointDirective, LockScrollVerticalDirective, LockScrollHorizontalDirective],
  exports: [LockScrollContainerDirective, LockScrollReferencePointDirective, LockScrollVerticalDirective, LockScrollHorizontalDirective]
})
export class LockScrollModule {}
