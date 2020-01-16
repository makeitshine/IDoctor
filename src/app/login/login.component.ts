import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/first';

import { AuthenticationService } from '../_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
    model: any = {};
    loading = false;
    returnUrl: string;
    error = '';

    constructor(
      private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { 
          if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
        }

    ngOnInit() {
        // reset login status
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f() { return this.loginForm.controls; }
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .first()
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}