import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-checkbox',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './checkbox.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyFieldCheckbox extends FieldType {
	readonly formControl: FormControl;
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
