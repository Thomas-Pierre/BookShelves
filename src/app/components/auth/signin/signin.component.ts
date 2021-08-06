import { AuthService } from '@/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SignInComponent implements OnInit {

  signInForm?: FormGroup | any;
  errorMessage?: string;
  redirectFromAuthGard: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.queryParams.subscribe(queryParams=> {
      if (queryParams.redirectFromAuthGard)
        this.redirectFromAuthGard = true;
    });
   
    
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });
  }

  onSubmit() {
    const { email, password } = this.signInForm?.value;
    this.authService.signInUser(email, password).then(
      () => this.router.navigate(['/books']), 
      error => this.errorMessage = error
    );
  }

}
