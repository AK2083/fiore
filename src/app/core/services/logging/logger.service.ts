import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  warningFlag = true;
  debugFlag = true;
  errorFlag = true;

  constructor() {
    this.debugFlag = 
      environment.logging === 'debug' && !environment.production;
    this.warningFlag = 
      environment.logging === 'warning' || environment.logging === 'debug' || !environment.production;
    this.errorFlag = 
      environment.logging === 'error' || environment.logging === 'warning' || environment.logging === 'debug' || !environment.production;
  }

  error(msg: string, params?: unknown) {
    if (this.errorFlag)
      console.error(msg, params);
  }

  warn(msg: string, params?: unknown) {
    if (this.warningFlag)
      console.warn(msg, params);
  }

  log(msg: string, params?: unknown) {
    if (this.debugFlag)
      console.log(msg, params);
  }
}
