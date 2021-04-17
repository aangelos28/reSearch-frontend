import {Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NavbarSearchService {

  private readonly _query: FormControl;

  constructor() {
    this._query = new FormControl('', [
      Validators.required
    ]);
  }

  public get query(): FormControl {
    return this._query;
  }

  public setQuery(val: string): void {
    this._query.setValue(val);
  }
}
