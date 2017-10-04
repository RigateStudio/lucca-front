import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from 'ng-formly';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdInputModule, MdOptionModule, MdSelectModule } from '@angular/material';

import { DemoFormlyComponent } from './formly.component';
import { LuFormlyModule } from '../../../src/app/formly';
import { LuEmptyModule } from '../../../src/app/empty';
import { SharedModule } from '../shared/index';

import { BasicComponent } from './basic/basic';
import { DebugComponent } from './debug/debug';
import { FieldgroupComponent } from './fieldgroup/fieldgroup';
import { ValidationComponent } from './validation/validation';
import { ChangeComponent } from './change/change';
import { OptionComponent } from './option/option';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		FormlyModule.forRoot(),
		LuFormlyModule,
		LuEmptyModule,

		MdAutocompleteModule,
		MdInputModule,
		MdOptionModule,
		MdSelectModule,
	],
	declarations: [
		DemoFormlyComponent,
		DebugComponent,
		BasicComponent,
		FieldgroupComponent,
		ValidationComponent,
		ChangeComponent,
		OptionComponent,
	],
	exports: [
		DemoFormlyComponent,
	]
})
export class DemoFormlyModule { }