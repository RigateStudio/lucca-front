import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { StickyElementComponent } from './sticky-element.component';
import { CommonModule } from '@angular/common';
import { LockScrollContainerDirective, LockScrollReferencePointDirective, LockScrollVerticalDirective, LockScrollHorizontalDirective } from '.';



@NgModule({
	declarations: [
		StickyElementComponent,
		LockScrollContainerDirective,
		LockScrollReferencePointDirective,
		LockScrollVerticalDirective,
		LockScrollHorizontalDirective
	],
	exports: [LockScrollContainerDirective, LockScrollReferencePointDirective, LockScrollVerticalDirective, LockScrollHorizontalDirective],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: StickyElementComponent },
		]),
	],
})
export class StickyElementModule { }
