import { Routes } from '@angular/router';
import { AuthUserComponent } from './pages/auth-user/auth-user.component';

export const routes: Routes = [
    { path: 'auth', component: AuthUserComponent },
    { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
