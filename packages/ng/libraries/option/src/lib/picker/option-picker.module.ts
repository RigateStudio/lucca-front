import { NgModule } from '@angular/core';
import { LuOptionPickerComponent } from './option-picker.component';
import { CommonModule } from '@angular/common';
import { LuOptionItemModule } from '../item/index';
import { LuScrollModule } from '@lucca-front/ng/scroll';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { LuOptionPickerAdvancedComponent } from './option-picker-advanced.component';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuOptionItemModule,
		LuScrollModule,
		A11yModule,
	],
	declarations: [
		LuOptionPickerComponent,
		LuOptionPickerAdvancedComponent,
	],
	exports: [
		LuOptionPickerComponent,
		LuOptionPickerAdvancedComponent,
	],
})
export class LuOptionPickerModule {}
