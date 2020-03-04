import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MyIssueComponent } from './my-issue.component';
import { LockScrollModule } from './lock-scroll-module.module';



@NgModule({
	declarations: [
		MyIssueComponent,
	],
	imports: [
		LockScrollModule,
		RouterModule.forChild([
			{ path: '', component: MyIssueComponent },
		]),
	],
})
export class MyIssueModule {}
