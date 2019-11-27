import { ALuDateAdapter, ILuDateAdapter, DateGranularity } from '../adapter/index';
import { LOCALE_ID, Inject } from '@angular/core';
import { getLocaleDateFormat, FormatWidth, formatDate } from '@angular/common';

export class LuNativeDateAdapter extends ALuDateAdapter<Date> implements ILuDateAdapter<Date> {

	private _regex = /[\/\,\.\-\s]/i;
	private _order = {
		date: 0,
		month: 1,
		year: 2,
	};
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
	) {
		super();
		this.initOrder();
	}
	private initOrder() {
		const format = getLocaleDateFormat(this._locale, FormatWidth.Short);
		const groups = format.split(this._regex);
		groups.forEach((g, i) => {
			if (g.indexOf('d') !== -1) { return this._order.date = i; }
			if (g.indexOf('M') !== -1) { return this._order.month = i; }
			if (g.indexOf('y') !== -1) { return this._order.year = i; }
		});
	}
	isParsable(text: string): boolean {
		if (!text) { return false; }
		const groups = text.split(this._regex);
		if (groups.length !== 3) { return false; }
		try {
			const date = parseInt(groups[this._order.date], 10);
			const month = parseInt(groups[this._order.month], 10);
			const year = parseInt(groups[this._order.year], 10);
			const d = new Date(year, month - 1, date);
			// checking if its a valid date
			// https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
			if (!(d instanceof Date)) { return false; }
			if (isNaN(d.getTime())) { return false; }
			// d is a valid date, but
			// as i can write new Date(1234, 56, 78) and mr javascript accepts it
			// i check now that the generated date has the same year/month/date as what i entered
			// if (d.getFullYear() !== year && d.getYear() !== year) { return false; } // getYear doesn't exist anymore
			if (d.getMonth() !== month - 1) { return false; }
			if (d.getDate() !== date) { return false; }
			return true;
		} catch {
			return false;
		}
	}
	parse(text: string): Date {
		if (!text) { return undefined; }
		if (!this.isParsable(text)) {
			this.forgeInvalid();
		}

		const groups = text.split(this._regex);
		const date = parseInt(groups[this._order.date], 10);
		const month = parseInt(groups[this._order.month], 10);
		const year = parseInt(groups[this._order.year], 10);

		return this.forge(year, month, date);
	}
	format(d: Date, format: string): string {
		return formatDate(d, format, this._locale);
	}
	forge(year: number, month: number, date: number): Date {
		return new Date(year, month - 1, date); // month-1 cuz 0 -> january
	}
	forgeInvalid(): Date {
		return new Date('Invalid Date');
	}
	isValid(d: Date): boolean {
		if (!(d instanceof Date)) { return false; }
		if (isNaN(d.getTime())) { return false; }
		return true;
	}
	compare(a: Date, b: Date, granularity: DateGranularity): number {
		if (!a || !b || !this.isValid(a) || !this.isValid(b)) {
			throw new Error('you must provide valid and not null dates to be compared');
		}
		const aDecade = Math.floor(a.getFullYear() / 10);
		const bDecade = Math.floor(b.getFullYear() / 10);
		if (aDecade < bDecade) { return -1; }
		if (aDecade > bDecade) { return 1; }
		if (granularity === DateGranularity.decade) { return 0; }

		const aYear = a.getFullYear();
		const bYear = b.getFullYear();
		if (aYear < bYear) { return -1; }
		if (aYear > bYear) { return 1; }
		if (granularity === DateGranularity.year) { return 0; }

		const aMonth = a.getMonth();
		const bMonth = b.getMonth();
		if (aMonth < bMonth) { return -1; }
		if (aMonth > bMonth) { return 1; }
		if (granularity === DateGranularity.month) { return 0; }

		const aDate = a.getDate();
		const bDate = b.getDate();
		if (aDate < bDate) { return -1; }
		if (aDate > bDate) { return 1; }
		if (granularity === DateGranularity.day) { return 0; }

		return 0;
	}
	clone(d: Date): Date {
		return new Date(d);
	}

	getYear(d: Date): number {
		return d.getFullYear();
	}
	getMonth(d: Date): number {
		return d.getMonth() + 1;
	}
	getDate(d: Date): number {
		return d.getDate();
	}
}