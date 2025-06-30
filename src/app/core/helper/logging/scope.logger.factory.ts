import { inject } from '@angular/core';
import { LoggerService } from '@core/services/logging/logger.service';
import { ScopedLogger } from '@core/helper/logging/scope.logger';

export function scopedLoggerFactory(component: unknown): ScopedLogger {
  const loggerService = inject(LoggerService);
  const scope = typeof component === 'function' && 'name' in component
  ? component.name
  : 'UnknownComponent';
  return new ScopedLogger(loggerService, scope);
}
