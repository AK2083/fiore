import { Routes } from '@angular/router';
import { CallbackComponent } from '@features/auth/components/callback/callback.component';
import { RegistrationComponent } from '@features/auth/components/registration/registration.component';

export const routes: Routes = [
    { path: 'auth', component: RegistrationComponent },
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth/callback', component: CallbackComponent }
];
