import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async signUpNewUser(mail: string, pwd: string) {
    console.log('Registriere mich');
    const { data, error } = await this.supabase.auth.signUp({
      email: mail,
      password: pwd,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    })

    if (error)
      console.error('Konnte nicht registriert werden: ', error);
    else
      console.log('Konnte erfolreich registriert werden als: ' + data.user);
  }
}
