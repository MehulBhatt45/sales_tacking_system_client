import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private _loginService: LoginService
		) { 
		// redirect to home if already logged in
		if (this._loginService.currentUserValue) { 
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}

		this.loading = true;
		var data = {name: this.registerForm.value.firstName+ ' ' +this.registerForm.value.lastName,
					email: this.registerForm.value.username, role: 'BDE', password: this.registerForm.value.password};
		this._loginService.register(data)
		.pipe(first())
		.subscribe(data => {
			this.router.navigate(['/login']);
		},
		error => {
			console.log(error);
			this.loading = false;
		});
	}
}

