import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientTracksComponent } from './client-tracks/client-tracks.component';

const routes: Routes = [
	{
		path:'login',
		component:LoginComponent
	},
	{
		path:'register',
		component:RegisterComponent
	},

	{
		path:"",
		component:HomeComponent,
		canActivate: [AuthGuard],
		children:[{
			path:'',
			pathMatch:"full",
			redirectTo:'view-clients'
		},{
			path:'view-clients',
			component: ClientTracksComponent
		}]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
