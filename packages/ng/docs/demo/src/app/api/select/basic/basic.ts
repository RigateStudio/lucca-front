import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-basic-api-select',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class BasicComponent implements OnInit {
	item = { id: 1, name: 'lucca' };

	constructor() {}

	ngOnInit() {}
}
