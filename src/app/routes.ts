import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AgentPageComponent } from './components/agent-page/agent-page.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { AuthGuardService } from './auth/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'agent', component: AgentPageComponent },
  { path: 'customer', component: CustomerPageComponent, canActivate: [AuthGuardService] }
  // { path: '**', component: PageNotFoundComponent }
];
