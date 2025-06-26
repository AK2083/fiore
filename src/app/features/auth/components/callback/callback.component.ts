import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '@features/auth/services/localize/translation.service';
import { SupabaseService } from '@features/auth/services/supabase/supabase.service';
import { HintComponent } from '@shared/components/misc/hint/hint.component';
import { AuthError } from '@supabase/supabase-js';

@Component({
  selector: 'app-callback',
  imports: [HintComponent],
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private translate = inject(TranslationService);
  private router = inject(Router);

  message: Signal<string> = signal('');
  severity: 'danger' | 'warning' | 'info' = 'info';
  params: URLSearchParams = new URLSearchParams();

  async ngOnInit() {
    try {
      this.setParameter();
    } catch (error) {
      if (error instanceof AuthError) this.setCommonError(error);
    } finally {
      this.setClearHistory();
    }
  }

  setParameter() {
    const hash = window.location.hash.substring(1);
    this.params = new URLSearchParams(hash);

    if (this.params.get('access_token') && this.params.get('refresh_token')) {
      this.supabase.setSession(
        this.params.get('access_token') ?? '',
        this.params.get('refresh_token') ?? '',
      );
      this.redirectByType();
    } else {
      this.setLinkExpired();
    }
  }

  redirectByType() {
    switch (this.params.get('type')) {
      case 'signup':
      case 'email_otp':
        this.setRegisterSuccessful();
        break;
      case 'recovery':
        this.setPasswordResetProcessed();
        break;
      default:
        this.redirect('/auth');
        break;
    }
  }

  setClearHistory() {
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search,
    );
  }

  setHint(message: Signal<string>, severity: 'danger' | 'warning' | 'info') {
    this.message = message;
    this.severity = severity;
  }

  setCommonError(error: AuthError) {
    this.setHint(this.translate.authError(error.message), 'danger');
  }

  setLinkExpired() {
    this.setHint(this.translate.linkExpired(), 'danger');
  }

  setPasswordResetProcessed() {
    this.setHint(this.translate.processReset(), 'info');
    this.redirect('/reset-password-form');
  }

  setRegisterSuccessful() {
    this.setHint(this.translate.successReport(), 'info');
  }

  redirect(redirectTo: string) {
    const redirectInMilliSeconds = 3000;

    setTimeout(() => {
      this.router.navigate([redirectTo]);
    }, redirectInMilliSeconds);
  }
}
