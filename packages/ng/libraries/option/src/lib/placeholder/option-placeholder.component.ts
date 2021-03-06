import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { LuOptionPlaceholderIntl } from './option-placeholder.intl';
import { ILuOptionPlaceholderLabel } from './option-placeholder.translate';

@Component({
	selector: 'lu-option-placeholder',
	templateUrl: './option-placeholder.component.html',
	styleUrls: ['./option-placeholder.component.scss']
})
export class LuOptionPlaceholderComponent {
	@Output() onClear = new EventEmitter();

	constructor(
		@Inject(LuOptionPlaceholderIntl) public intl: ILuOptionPlaceholderLabel,
	){}

	clear() {
		this.onClear.emit();
	}
}
