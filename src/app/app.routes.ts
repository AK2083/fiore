import { Routes } from '@angular/router';
import { RegistrationComponent } from '@features/auth/components/registration/registration.component';

export const routes: Routes = [
    { path: 'auth', component: RegistrationComponent },
    { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
