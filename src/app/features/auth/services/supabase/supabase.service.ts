import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@environments/environment';
import { ErrorService, ErrorType } from '@core/services/error/error.service';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private loggerService = scopedLoggerFactory(SupabaseService);

  constructor(private errorService: ErrorService) {
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
      this.errorService.addError({
        type: ErrorType.error,
        userMessage: 'Ein kritischer Fehler ist aufgetreten: ' + error.message,
        additionalMessage: 'Bitte überprüfen Sie die Logs.',
      });

      throw error;
    }

    if (!data.user && !data.session) {
      const warning = 'E-Mail bereits registriert oder keine Session erstellt.';
      this.loggerService.warn(warning, { email: mail });
      this.errorService.addError({
        type: ErrorType.warning,
        userMessage: 'Diese E-Mail-Adresse ist bereits registriert.',
        additionalMessage:
          'Bitte melden Sie sich an oder verwenden Sie eine andere E-Mail-Adresse.',
      });

      throw new Error(warning);
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
      throw error;
    }

    this.loggerService.log('Session set successfully');
  }
}
