import { Component, ViewChild, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-date',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './date.html',
})
export class LuFormlyFieldDate extends FieldType {
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
