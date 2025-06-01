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

  async signUpNewUser(mail: string, pwd: string): Promise<boolean> {    
    const { data, error } = await this.supabase.auth.signUp({
      email: mail,
      password: pwd,
    })
    
    if (error != null || error != undefined) {
      this.errorService.addError({
          type: ErrorType.error,
          userMessage: "Ein kritischer Fehler ist aufgetreten: " + error.message,
          additionalMessage: "Bitte überprüfen Sie die Logs.",
      });

      return false;
    }
    
    return true;
  }
}
