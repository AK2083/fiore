import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@environments/environment';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';
import { ErrorType } from '@core/models/messages/error.message.model';
import { DisplayType } from '@core/models/messages/user.message.model';
import { SupabaseCriticalException } from '@features/auth/models/error/supabaseCriticalException';
import { DuplicateMailException } from '@features/auth/models/error/duplicateMailException';
import { SupabaseSessionError } from '@features/auth/models/error/supabaseSessionError';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private loggerService = scopedLoggerFactory(SupabaseService);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

    this.loggerService.log('SupabaseClient initialized');
  }

  async signUpNewUser(mail: string, pwd: string): Promise<boolean> {
    this.loggerService.log('Attempting sign-up for email:', mail);

    const { data, error } = await this.supabase.auth.signUp({
      email: mail,
      password: pwd,
      options: {
        emailRedirectTo:
          'https://9000-idx-fiore-1738828672064.cluster-rz2e7e5f5ff7owzufqhsecxujc.cloudworkstations.dev/auth/callback',
      },
    });

    if (error) {
      this.loggerService.error('Supabase sign-up error:', error);
      throw new SupabaseCriticalException({
        title: 'Wrong password',
        message: 'Ein kritischer Fehler ist aufgetreten',
        details: { ['SUPABASE_ERROR']: error },
        code: 'SUPABASE_ERROR',
        displayType: DisplayType.Inline,
        severity: 'danger',
      });
    }

    if (!data.user && !data.session) {
      this.loggerService.warn(
        'E-Mail bereits registriert oder keine Session erstellt.',
        mail,
      );

      throw new DuplicateMailException({
        title: 'Wrong password',
        message:
          'Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich an oder verwenden Sie eine andere E-Mail-Adresse.',
        details: { ['MAIL']: mail },
        code: 'SUPABASE_WARNING',
        displayType: DisplayType.Inline,
        severity: 'danger',
      });
    }

    this.loggerService.log('Sign-up successful for email:', mail);
    return true;
  }

  async setSession(accessToken: string, refreshToken: string) {
    this.loggerService.log('Setting session with accessToken and refreshToken');
    const { error } = await this.supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      this.loggerService.error('Error setting session:', error);
      throw new SupabaseSessionError({
        title: 'Session Fehler',
        message: 'Session konnte nicht gesetzt werden.',
        details: { ['SUPABASE_ERROR']: error },
        code: 'SUPABASE_ERROR',
        displayType: DisplayType.Inline,
        severity: 'danger',
      });
    }

    this.loggerService.log('Session set successfully');
  }
}
