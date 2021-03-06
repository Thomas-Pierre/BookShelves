import { AuthService } from '@/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit {

  signUpForm?: FormGroup | any;
  errorMessage?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });
  }

  onSubmit() {
    const { email, password } = this.signUpForm?.value;
    this.authService.createNewUser(email, password).then(
      () => this.router.navigate(['/items']), 
      error => this.errorMessage = error
    );
  }

}
