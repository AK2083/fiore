import { LoggerService } from '@core/services/logging/logger.service';

export class ScopedLogger {
  constructor(
    private readonly logger: LoggerService,
    private readonly scope: string,
  ) {}

  log(message: string, params?: unknown) {
    this.logger.log({ scope: this.scope, message, params });
  }

  error(message: string, params?: unknown) {
    this.logger.error({ scope: this.scope, message, params });
  }

  warn(message: string, params?: unknown) {
    this.logger.warn({ scope: this.scope, message, params });
  }
}
