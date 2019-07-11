import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TreePickerAdvancedComponent } from './tree-picker-advanced.component';
import { FormsModule } from '@angular/forms';
import { LuSelectModule, LuTreeModule, LuInputDisplayerModule } from '@lucca-front/ng';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		TreePickerAdvancedComponent,
	],
	imports: [
		LuInputDisplayerModule,
		LuSelectModule,
		LuTreeModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: TreePickerAdvancedComponent },
		]),
	],
})
export class TreePickerAdvancedModule {}