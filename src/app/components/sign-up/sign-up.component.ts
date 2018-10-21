import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../../assets/styles/global.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _restService: RestApiService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  signUp() {
    console.log(this.signUpForm.value);
    if (this.signUpForm.valid) {
      this._restService.registerCustomer(this.signUpForm.value).subscribe(
        data => {
          console.log(data);
        },
        err => {
          if (err.status === 400) {
            alert(err.error);
          }
        }
      );
    } else {
      alert('Inavlid values entered');
    }
  }
}
