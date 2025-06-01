import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@environments/environment';
import { ErrorService, ErrorType } from '@core/services/error/error.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;


  constructor(private errorService: ErrorService) { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async signUpNewUser(mail: string, pwd: string) {
    console.log('Registriere mich');
    const { data, error } = await this.supabase.auth.signUp({
      email: mail,
      password: pwd,
    })

    if (error)
      this.errorService.errors.push({
          type: ErrorType.error,
          userMessage: "Ein kritischer Fehler ist aufgetreten.",
          additionalMessage: "Bitte überprüfen Sie die Logs.",
        });
    else
      console.log('Konnte erfolreich registriert werden als: ' + data.user);
  }
}
