import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowHandlerService {
  getUrlSearchParams() {
    const hash = window.location.hash.substring(1);
    return new URLSearchParams(hash);
  }

  clearHistory() {
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search,
    );
  }
}
