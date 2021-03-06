import { Component, Inject, Optional, ChangeDetectionStrategy } from '@angular/core';
import { LuPopup, LU_POPUP_DATA } from '@lucca-front/ng/popup';
import { LuModal, LU_MODAL_DATA } from '@lucca-front/ng/modal';
import { LuSidepanel, LU_SIDEPANEL_DATA } from '@lucca-front/ng/sidepanel';

import { of } from 'rxjs';

@Component({
	selector: 'lu-fix-modal',
	templateUrl: './fix-modal.component.html'
})
export class FixModalComponent {
	constructor(
		private _popup: LuPopup,
		private _modal: LuModal,
		private _sidepanel: LuSidepanel,
	) {}
	openPopup(data?) {
		this._popup.open(BasicModalContent, data);
	}
	openModal(data?) {
		this._modal.open(BasicModalContent, data, { changeDetection: ChangeDetectionStrategy.Default});
	}
	openSidepanel(data?) {
		this._sidepanel.open(BasicModalContent, data, { changeDetection: ChangeDetectionStrategy.Default});
	}
}
@Component({
	selector: 'lu-modal-content',
	template: `content of the modal component <br>
	popup data: {{popupData}}<br>
	modal data: {{modalData}}<br>
	sidepanel data: {{sidepanelData}}<br>
	`
})
export class BasicModalContent {
	title = 'title';
	submitAction = () => of(true);

	constructor(
		@Optional()@Inject(LU_POPUP_DATA) public popupData,
		@Optional()@Inject(LU_MODAL_DATA) public modalData,
		@Optional()@Inject(LU_SIDEPANEL_DATA) public sidepanelData,
	) {}
}
