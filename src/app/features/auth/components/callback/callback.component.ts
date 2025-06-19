import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@features/auth/services/supabase/supabase.service';
import { TranslationService } from '@features/translation/services/translation/translation.service';
import { HintComponent } from '@shared/components/misc/hint/hint.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-callback',
  imports: [HintComponent, AsyncPipe],
  templateUrl: './callback.component.html',
  styles: ``,
})
export class CallbackComponent implements OnInit {
  message$: Observable<string> = of();
  severity: 'danger' | 'warning' | 'info' = 'info';
  params: URLSearchParams = new URLSearchParams();

  constructor(
    private supabase: SupabaseService,
    private translate: TranslationService,
    private router: Router,
  ) {}

  async ngOnInit() {
    try {
      this.setParameter();
    } catch (error: any) {
      this.setCommonError(error);
    } finally {
      this.setClearHistory();
    }
  }

  setParameter() {
    const hash = window.location.hash.substring(1);
    this.params = new URLSearchParams(hash);

    if (this.params.get('access_token') && this.params.get('refresh_token')) {
      this.supabase.setSession(this.params.get('access_token') ?? "", this.params.get('refresh_token') ?? "");
      this.redirectByType();
    } else {
      this.setLinkExpired();
    }
  }

  redirectByType() {
    switch(this.params.get('type')) {
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

  setHint(message: Observable<string>, severity: 'danger' | 'warning' | 'info') {
    this.message$ = message;
    this.severity = severity;
  }

  setCommonError(error: any) {
    this.setHint(this.translate.getAuthError(error.message), 'danger');
  }

  setLinkExpired() {
    this.setHint(this.translate.getLinkExpired(), 'danger');
  }

  setPasswordResetProcessed() {
    this.setHint(this.translate.getPWResetProcessed(), 'info');
    this.redirect('/reset-password-form');
  }

  setRegisterSuccessful() {
    this.setHint(this.translate.getRegisterSuccessful(), 'info');
    //this.redirect('/dashboard');
  }

  redirect(redirectTo: string) {
    const redirectInMilliSeconds = 3000;

    setTimeout(() => {
      this.router.navigate([redirectTo]);
    }, redirectInMilliSeconds);
  }
}
