import { Observable } from 'rxjs';

export interface ILuOptionSelector<T = any> {
	multiple: boolean;
	onSelectValue: Observable<T | T[]>;
	setValue(value: T | T[]): void;
}
export abstract class ALuOptionSelector<T = any> implements ILuOptionSelector<T> {
	multiple: boolean;
	abstract onSelectValue: Observable<T | T[]>;
	abstract setValue(value: T | T[]): void;
}
