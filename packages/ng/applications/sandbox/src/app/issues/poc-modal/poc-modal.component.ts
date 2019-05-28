import { Component } from '@angular/core';
import { LuModal, ALuModalRef, ILuModalContent } from '@lucca-front/ng';
import { timer, Subject, throwError } from 'rxjs';
import { mapTo, catchError } from 'rxjs/operators';

@Component({
	selector: 'lu-poc-modal',
	templateUrl: './poc-modal.component.html'
})
export class PocModalComponent {
	result$ = new Subject();
	constructor(private _luModal: LuModal) {}
	open() {
		this._luModal.open(PocModalInsideComponent).onClose.subscribe(r => this.result$.next(r));
	}
}
@Component({
	selector: 'lu-poc-modal-inside',
	template: `
		<p>only the content in this injected component</p>
		<label class="label">{{error}}</label>
		<div class="textfield">
			<input class="textfield-input" [(ngModel)]="result">
			<label class="textfield-label">result</label>
		</div>
		<div class="checkbox">
			<input class="checkbox-input" type="checkbox" name="checkbox" id="checkbox" [(ngModel)]="submitDisabled">
			<label class="checkbox-label" for="checkbox">disable submit</label>
		</div>
	`,
})
export class PocModalInsideComponent implements ILuModalContent {
	title = 'title of the component';
	submitLabel = 'submit';
	submitDisabled = false;

	result = 0;
	error;
	// submitAction = () => timer(1500).pipe(mapTo(this.result));
	submitAction = () => {
		const obs$ = throwError(`error with result ${this.result}`);

		return obs$.pipe(
			catchError(err => { this.error = err; return throwError(`error message`); })
		)
	}
	constructor(
		protected _ref: ALuModalRef<PocModalInsideComponent>,
	) {}
	closeModal() {
		this._ref.close();
	}
}