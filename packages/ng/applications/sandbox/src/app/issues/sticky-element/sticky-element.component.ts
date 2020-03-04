import { Component } from '@angular/core';

interface Machin {
	id: number;
	truc: string;
	bidule: string;
	machin: string;
	col4: string;
	col5: string;
	col6: string;
	col7: string;
}

@Component({
	selector: 'sand-sticky-element',
	templateUrl: './sticky-element.component.html'
})
export class StickyElementComponent {

	fakeList: Machin[];
	constructor() {
		this.fakeList = [];
		for (let index = 0; index < 100; index++) {
			this.fakeList.push({
				id: index,
				truc: `Truc ${index}`,
				bidule: `Bidule ${index}`,
				machin: `Machin ${index}`,
				col4: `Col4 ${index}`,
				col5: `Col5 ${index}`,
				col6: `Col6 ${index}`,
				col7: `Col7 ${index}`,
			});
		}

	}
}
