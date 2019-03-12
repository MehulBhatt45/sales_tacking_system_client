import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
	constructor(public router : Router){

	}

	ngOnInit() {
		if(!this.currentUser){
			this.router.navigate(['/login'])
		}
	}
}
