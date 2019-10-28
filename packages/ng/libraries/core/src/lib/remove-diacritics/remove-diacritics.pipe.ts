import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'luRemoveDiacritics' })
export class LuRemoveDiacriticsPipe implements PipeTransform {

	constructor() { }

	public transform(value: any): string {
		return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

}
