import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserInfoService {

  private readonly _onFirefox: boolean;
  private readonly _onChrome: boolean;
  private readonly _onEdge: boolean;
  private readonly _onSafari: boolean;
  private readonly _onOpera: boolean;

  constructor() {
    this._onFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    this._onChrome = navigator.userAgent.indexOf('Chrome') !== -1;
    this._onEdge = navigator.userAgent.indexOf('Edge') !== -1;
    this._onSafari = navigator.userAgent.indexOf('Safari') !== -1;
    this._onOpera = navigator.userAgent.indexOf('Opera') !== -1;
  }

  get onFirefox(): boolean {
    return this._onFirefox;
  }

  get onChrome(): boolean {
    return this._onChrome;
  }

  get onEdge(): boolean {
    return this._onEdge;
  }

  get onSafari(): boolean {
    return this._onSafari;
  }

  get onOpera(): boolean {
    return this._onOpera;
  }
}
