import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HTTPAuthInterceptor } from './services/http-interceptor.service';
import { AgentPageComponent } from './components/agent-page/agent-page.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { DisplayStatusPipe } from './pipes/display-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AgentPageComponent,
    CustomerPageComponent,
    DisplayStatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
