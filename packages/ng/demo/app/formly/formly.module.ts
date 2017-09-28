import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from 'ng-formly';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoFormlyComponent } from './formly.component';
import { LuFormlyModule } from '../../../src/app/formly';
import { SharedModule } from '../shared/index';

import { BasicComponent } from './basic/basic';
import { DebugComponent } from './debug/debug';
import { FieldgroupComponent } from './fieldgroup/fieldgroup';
import { ValidationComponent } from './validation/validation';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		FormlyModule.forRoot(),
		LuFormlyModule,
	],
	declarations: [
		DemoFormlyComponent,
		DebugComponent,
		BasicComponent,
		FieldgroupComponent,
		ValidationComponent,
	],
	exports: [
		DemoFormlyComponent,
	]
})
export class DemoFormlyModule { }
