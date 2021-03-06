import { ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ILuOptionOperator } from '@lucca-front/ng/option';
import { ILuApiItem } from '../../api.model';
import { Observable, of, merge, Subject } from 'rxjs';
import { switchMap, catchError, mapTo, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { ILuApiService } from '../../service/index';

enum Strategy {
	append,
	replace,
}
const MAGIC_PAGE_SIZE = 20;
export interface ILuApiOptionPager<T extends ILuApiItem = ILuApiItem> extends ILuOptionOperator<T> {}
export interface ILuApiPagerService<T extends ILuApiItem = ILuApiItem> {
	getPaged(page: number): Observable<T[]>;
}

export abstract class ALuApiOptionPager<T extends ILuApiItem = ILuApiItem, S extends ILuApiService<T> = ILuApiService<T>>
implements ILuApiOptionPager<T>, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber {
	outOptions$ = new Subject<T[]>();
	loading$: Observable<boolean>;

	protected _loading = false;
	protected _results$: Observable<{ items: T[], strategy: Strategy }>;
	protected _options: T[] = [];
	protected _page$ = new Subject<number>();
	protected _page: number;
	protected _initialized = false;
	constructor(protected _service: S) {
	}
	protected init() {
		this.initObservables();
	}
	onOpen() {
		if (!this._initialized) {
			this._page$.next(0);
			this._initialized = true;
		}
	}
	// onClose() {
	// 	this._page$.next(0);
	// }
	onScrollBottom() {
		if (!this._loading) {
			this._page$.next(this._page + 1);
		}
	}
	protected initObservables() {
		const _results$: Observable<{ items: T[], strategy: Strategy }> = this._page$
		.pipe(
			distinctUntilChanged(),
			tap(p => this._page = p),
			switchMap(page => {
				if (page === undefined) {
					return of({ items: [], strategy: Strategy.replace });
				}
				return this._service.getPaged(page).pipe(
					map(items => ({ items: items, strategy: page === 0 ? Strategy.replace : Strategy.append }))
				);
			}),
			catchError(err => of({ items: [], strategy: Strategy.replace })),
			tap(results => {
				if (results.strategy === Strategy.replace) {
					this._options = [...results.items];
				} else {
					this._options.push(...results.items);
				}
				this.outOptions$.next([...this._options]);
			}),
		);

		this.loading$ = merge(
			this._page$.pipe(mapTo(true)),
			_results$.pipe(mapTo(false)),
		);
		this.loading$.subscribe(l => this._loading = l);
	}
}
