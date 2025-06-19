import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@environments/environment';
import { ErrorService, ErrorType } from '@core/services/error/error.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private errorService: ErrorService) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  async signUpNewUser(mail: string, pwd: string): Promise<boolean> {
    const { data, error } = await this.supabase.auth.signUp({
      email: mail,
      password: pwd,
      options: {
        emailRedirectTo:
          'https://9000-idx-fiore-1738828672064.cluster-rz2e7e5f5ff7owzufqhsecxujc.cloudworkstations.dev/auth/callback',
      },
    });

    if (error) {
      this.errorService.addError({
        type: ErrorType.error,
        userMessage: 'Ein kritischer Fehler ist aufgetreten: ' + error.message,
        additionalMessage: 'Bitte überprüfen Sie die Logs.',
      });

      throw error;
    }

    if (!data.user && !data.session) {
      this.errorService.addError({
          type: ErrorType.warning,
          userMessage: 'Diese E-Mail-Adresse ist bereits registriert.',
          additionalMessage: 'Bitte melden Sie sich an oder verwenden Sie eine andere E-Mail-Adresse.'
      });
      
      throw new Error('E-Mail bereits registriert');
  }

    return true;
  }

  async setSession(accessToken: string, refreshToken: string) {
    const { data, error } = await this.supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      throw error;
    }
  }
}
