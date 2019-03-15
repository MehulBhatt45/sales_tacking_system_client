import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


declare var $ : any;
import * as _ from 'lodash';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	titleCtrl = new FormControl('', Validators.required);
	tracks;
	currentUser = JSON.parse(localStorage.getItem('currentUser'));
	tracksFormGroup: FormGroup;
	constructor(public _loginService: LoginService, public router: Router, public _clientService: ClientsService) {
		this.getAllTrack();
	}
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
	getAllTrack(){
		this._clientService.getAllTracks().subscribe((res:any)=>{
			this.tracks = res;
		},err=>{
			console.log(err);
		})
	}

	editTrackTitle(index){
		console.log(index);
		$('#titleTrack'+index).prop("readOnly", false);
	}
	saveTrackTitle(index, data){
		console.log(index);
		data.title = data.title.replace(/\b\w/g, l => l.toUpperCase());
		data.trackId = data.title.toLowerCase();
		this._clientService.updateTrack(data).subscribe((res:any)=>{
			console.log(res);
			$('#titleTrack'+index).prop("readOnly", true);
		},err=>{
			console.log(err);
		})
	}
	checkIfReadonly(index?){
		if(index!=undefined){
			if ($('#titleTrack'+index).is('[readonly]')) {
				return true;
			}
			return false;
		}else{
			_.forEach(this.tracks, track=>{
				if ($('#titleTrack'+track.index+1).is('[readonly]')) {
					return true;
				}
				return false;	
			})
		}
	}
	onTrackDrop(event: CdkDragDrop<any>) {
		if(this.checkIfReadonly()){
			console.log(event.container.data, event.previousIndex, event.currentIndex);
			this.updateIndexOfTrack(event.container.data[event.previousIndex], event.previousIndex, event.currentIndex)
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
			this.tracks = event.container.data;
		}
	}

	updateIndexOfTrack(data, pIndex, cIndex){
		console.log(data, pIndex, cIndex);
		var dataObj = {data: data, pIndex: pIndex, cIndex: cIndex};
		this._clientService.updateTrackIndex(dataObj).subscribe(res=>{
			console.log(res);
		},err=>{
			console.log(err);
		})
	}

	addTrack(titleCtrl){
		var data = { title: titleCtrl.replace(/\b\w/g, l => l.toUpperCase()) , trackId: titleCtrl.toLowerCase(), index: this.tracks.length };
		this._clientService.addTrack(data).subscribe((res:any)=>{
			console.log(res);
			$('#addTrack').modal('hide');
			// $('#card_list').css({"width": "calc((100% / "+(this.tracks.length+1)+") - 12px)"});
			this.titleCtrl.setValue("");
		},err=>{
			console.log(err);
		})
	}

	updateTrack(titleCtrl){
		var data = { title: titleCtrl.replace(/\b\w/g, l => l.toUpperCase()) , trackId: titleCtrl.toLowerCase(), index: this.tracks.length };
		
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

	deleteTrack(id){
		this._clientService.deleteTrack(id).subscribe(res=>{
			console.log(res);
		},err=>{
			console.log(err);
		})
	}
}
