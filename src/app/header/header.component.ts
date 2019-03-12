import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


declare var $ : any;
import * as _ from 'lodash';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	
	constructor(public _loginService: LoginService, public router: Router) { }
	currentUser = JSON.parse(localStorage.getItem('currentUser'));
	ngOnInit() {
		$('.button-collapse').sideNav({
			edge: 'left',
			closeOnClick: true
		});
		$('#login_details').click(function (){
			$(this).children('.dropdown-content').toggleClass('open');
		});

		$('#plus_details').click(function (){
			$(this).children('.dropdown-content').toggleClass('open');
		});
		
	}	

	logout() {
		this._loginService.logout();
		this.router.navigate(['/login']);
	}
	getTitle(name){
		var str = name.split(' ');
		return str[0].charAt(0).toUpperCase() + str[0].slice(1) + ' ' + str[1].charAt(0).toUpperCase() + str[1].slice(1);
	}

	getInitialsOfName(name){
		var str = name.split(' ')[0][0]+name.split(' ')[1][0];
		return str.toUpperCase();
		// return name.split(' ')[0][0]+name.split(' ')[1][0];
	}
}
