import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { RestApiService } from '../../services/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/styles/global.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _restService: RestApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this._restService.userLogin(this.loginForm.value).subscribe(
        data => {
          const authenticationDetails = {
            auth: data.auth,
            token: data.token,
            userType: data.userType
          };
          localStorage.setItem(
            'Authentication Details',
            JSON.stringify(authenticationDetails)
          );
          if (authenticationDetails.userType === 'agent') {
            this.router.navigate(['/agent']);
          } else if (authenticationDetails.userType === 'customer') {
            this.router.navigate(['/customer']);
          }
        },
        err => {
          if (err) {
            alert(err.error);
          }
        }
      );
    } else {
      alert('Inavlid values entered');
    }
  }
}
