import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ViewChild,
	Input,
	Renderer2,
	AfterContentInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ALuPickerPanel, ILuPickerPanel } from '@lucca-front/ng/picker';
import { ALuClearer, ILuClearer, ILuInputDisplayer, ALuInputDisplayer } from '@lucca-front/ng/input';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';

@Component({
	selector: 'lu-date-select',
	templateUrl: './date-select-input.component.html',
	styleUrls: ['./date-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDateSelectInputComponent),
			multi: true,
		},
	],
})
export class LuDateSelectInputComponent<D, P extends ILuPickerPanel<D> = ILuPickerPanel<D>>
extends ALuSelectInputComponent<D, P>
implements ControlValueAccessor, ILuInputWithPicker<D>, AfterContentInit {

	@Input('placeholder') set inputPlaceholder(p: string) { this._placeholder = p; }
	overlapInput = true;
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
	}

	@ViewChild(ALuPickerPanel, { static: true }) set _vcPicker(picker: P) {
		if (!picker) { return; }
		this._picker = picker;
	}
	@ViewChild(ALuClearer, { static: true }) set _vcClearer(clearer: ILuClearer) {
		if (!clearer) { return; }
		this._clearer = clearer;
	}
	@ViewChild(ALuInputDisplayer, { static: true }) set _vcDisplayer(displayer: ILuInputDisplayer<D>) {
		if (!displayer) { return; }
		this.displayer = displayer;
	}
}
