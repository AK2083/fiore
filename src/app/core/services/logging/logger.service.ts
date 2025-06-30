import { Injectable } from '@angular/core';
import { LoggingModel } from '@core/models/logging/logging.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  debugFlag = environment.logging === 'debug' && !environment.production;
  warningFlag =
    environment.logging === 'warning' ||
    environment.logging === 'debug' ||
    !environment.production;
  errorFlag =
    environment.logging === 'error' ||
    environment.logging === 'warning' ||
    environment.logging === 'debug' ||
    !environment.production;

  error(model: LoggingModel) {
    if (this.errorFlag) console.error(model.scope, model.message, model.params);
  }

  warn(model: LoggingModel) {
    if (this.warningFlag)
      console.warn(model.scope, model.message, model.params);
  }

  log(model: LoggingModel) {
    if (this.debugFlag) console.log(model.scope, model.message, model.params);
  }
}
