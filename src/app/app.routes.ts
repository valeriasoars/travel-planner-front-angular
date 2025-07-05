import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InitialComponent } from './pages/initial/initial.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'initial/:tipo', // 'login' ou 'register'
    component: InitialComponent,
  },
  { path: '', redirectTo: 'initial/register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
];
