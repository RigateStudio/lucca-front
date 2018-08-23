import { ILuPickerPanel, ALuPickerPanel } from '../../input/index';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ILuOptionItem } from '../item/index';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { ILuOptionOperator } from '../operator/index';
import { ESCAPE } from '@angular/cdk/keycodes';

export interface ILuOptionPickerPanel<T = any> extends ILuPickerPanel<T> {}

export abstract class ALuOptionPicker<T = any> extends ALuPickerPanel<T> implements ILuOptionPickerPanel<T> {
	private __operators;
	protected _subs = new Subscription();
	onSelectValue: Observable<T>;
	protected _value: T;
	setValue(value: T) {
		this._value = value;
		this._applySelected();
	}
	constructor() {
		super();
		this.triggerEvent = 'click';
	}
	protected set _optionItems$(optionItems$: Observable<ILuOptionItem<T>[]>) {
		// reapply selected when the options change
		this._subs.add(
			optionItems$
			.subscribe(o => this._applySelected())
		);
		// subscribe to any option.onSelect
		const singleFlow$ = optionItems$.switchMap(
			items => merge(...items.map(i => i.onSelect))
		);
		this._subs.add(
			singleFlow$
			.subscribe((value: T) => this._select(value))
		);
	}
	protected set _operators(operators: ILuOptionOperator<T>[]) {
		this.__operators = operators;
		let options$: Observable<T[]>;
		operators.forEach(operator => {
			operator.inOptions$ = options$;
			options$ = operator.outOptions$;
		});
	}
	onScrollBottom() {
		if (!this.__operators) { return; }
		this.__operators.forEach(o => {
			if (!o.onScrollBottom) { return; }
			o.onScrollBottom();
		});
	}
	protected abstract _select(val: T);
	protected abstract _applySelected();
	protected destroy() {
		this._subs.unsubscribe();
	}
	_handleKeydown(event: KeyboardEvent) {
		switch (event.keyCode) {
			case ESCAPE:
			this.onClose();
			return;
		}
	}
	onOpen() {
		this.__operators.forEach(o => {
			if (!o.onOpen) { return; }
			o.onOpen();
		});
		this._emitOpenEvent();
	}
	onClose() {
		this.__operators.forEach(o => {
			if (!o.onClose) { return; }
			o.onClose();
		});
		this._emitCloseEvent();
	}
}