import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ClientsService } from '../services/clients.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
declare var $ : any;
import * as _ from 'lodash';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { CommentService } from '../services/comment.service';

@Component({
	selector: 'app-client-tracks',
	templateUrl: './client-tracks.component.html',
	styleUrls: ['./client-tracks.component.css']
})
export class ClientTracksComponent implements OnInit {
	tracks;
	addClientForm: FormGroup;
	files: Array<File> = [];
	newClinet;
	currentUser = JSON.parse(localStorage.getItem('currentUser'));
	projectTeam;
	clients;
	options = [];
	filteredOptions: Observable<string[]>;
	constructor(public _clientService: ClientsService, public _commentService: CommentService) {
		this.createAddClientForm();
		this.getAllCommunication();
	}

	ngOnInit() {
		this.getEmptyTracks();
		this.getClients();
		this.getAllUsers();
		// this.filteredOptions = this.addClientForm.controls.communication_medium.valueChanges
		// .pipe(startWith(''),map(value => this._filter(value)));
		// this.filteredOptions.subscribe(res=>{console.log(res);});
	}
	private _filter(value: string) {
		console.log(value);
		const filterValue = value.toLowerCase();
		return this.options.map(x => x.name).filter(option =>
      option.toLowerCase().includes(value.toLowerCase()));
	}

	createAddClientForm(){
		this.addClientForm = new FormGroup({
			name : new FormControl('', Validators.required),
			email : new FormControl('', Validators.required),
			contact_number : new FormControl('', Validators.required),
			coordinator : new FormControl('', Validators.required),
			priority : new FormControl('', Validators.required),
			communication_medium : new FormControl('',Validators.required),
			status : new FormControl({value: '', disabled: true}, Validators.required)
		})
	}

	getAllCommunication(){
		this._clientService.getAllCommunication().subscribe((res:any)=>{
			this.options = res;
			console.log(this.options);
		},err=>{
			console.log(err);
		})
	}

	getEmptyTracks(){
		this.tracks = [{
			"title": "Communication Initiated",
			"id": "communication init",
			"class":"primary",
			"tasks": [

			]
		},
		{
			"title": "Call Scheduled",
			"id": "call schedule",
			"class":"info",
			"tasks": [

			]
		},
		{
			"title": "Meeting Arranged",
			"id": "meeting arranged",
			"class":"warning",
			"tasks": [

			]
		},
		{
			"title": "Lead Generated",
			"id": "lead generated",
			"class":"success",
			"tasks": [

			]
		},
		{
			"title": "Future",
			"id": "future",
			"class":"unique",
			"tasks": [

			]
		},
		{
			"title": "Nagative",
			"id": "nagative",
			"class":"danger",
			"tasks": [

			]
		}];
	}

	get trackIds(): string[] {
		return this.tracks.map(track => track.id);
	}

	getPriorityClass(priority){
		switch (Number(priority)) {
			case 4:
			return {class:"primary", title:"Low"}
			break;

			case 3:
			return {class:"warning", title:"Medium"}
			break;

			case 2:
			return {class:"success", title:"High"}
			break;


			case 1:
			return {class:"danger", title:"Highest"}
			break;

			default:
			return ""
			break;
		}
	}

	onTalkDrop(event: CdkDragDrop<any>) {
		console.log(event.container.id, event.container.data[_.findIndex(event.container.data, { 'status': event.previousContainer.id })]);
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
			this.updateStatus(event.container.id, event.container.data[_.findIndex(event.container.data, { 'status': event.previousContainer.id })]);
		}
	}

	getTitle(name){
		if(name){
			var str = name.split(' ');
			return str[0].charAt(0).toUpperCase() + str[0].slice(1) + ' ' + str[1].charAt(0).toUpperCase() + str[1].slice(1);
		}else{
			return '';
		}
	}


	getInitialsOfName(name){
		var str = name.split(' ')[0][0]+name.split(' ')[1][0];
		return str.toUpperCase();
		// return name.split(' ')[0][0]+name.split(' ')[1][0];
	}

	updateStatus(newStatus, data){
		data.status = newStatus;
		console.log("UniqueId", data.uniqueId);
		this._clientService.updateClientStatus(data).subscribe((res:any)=>{
			console.log(res);
			this.getClients();
		},(err:any)=>{
			console.log(err);
		})
	}

	onTrackDrop(event: CdkDragDrop<any>) {
		// console.log(event);
		moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
	}

	getEmptyNewClient(){
		this.newClinet = { name:'', email:'', contact_number: '', coordinator: '', status: 'communication init', priority: '3' };
	}

	openModel(task){
		console.log(task);
		this.newClinet = task;
		this.getAllCommentOfClinet(task._id);
		$('#fullHeightModalRight').modal('show');
	}

	getClients(){
		this.getEmptyTracks();
		this._clientService.getAllClient().subscribe(res=>{
			console.log(res);
			this.clients = res;
			_.forEach(this.clients , (client)=>{
				// console.log("task ======>" , task);
				_.forEach(this.tracks , (track)=>{
					if(client.status == track.id){
						track.tasks.push(client);
					}
				})
			})
		},err=>{
			console.log(err);
		})
	}

	onSelectFile(event){
		this.files = event.target.files;
	}

	saveTheClient(client){
		let data = new FormData();
		_.forOwn(client, function(value, key) {
			data.append(key, value)
		});
		data.append('status', 'communication init');
		if(this.files.length>0){
			for(var i=0;i<this.files.length;i++){
				data.append('fileUpload', this.files[i]);	
			}
		}
		this._clientService.addClient(data).subscribe((res:any)=>{
			$('#exampleModalPreviewLabel').modal('hide');
			// this.getProject(this.projectId);
		},err=>{
			console.log(err);
		})
	}
	comment;
	comments
	public model = {
		editorData: 'Enter comments here'
	};
	public Editor = DecoupledEditor;


	public onReady( editor ) {
		editor.ui.getEditableElement().parentElement.insertBefore(
			editor.ui.view.toolbar.element,
			editor.ui.getEditableElement()
			);
	}

	public onChange( { editor }: ChangeEvent ) {
		const data = editor.getData();
		this.comment = data.replace(/<\/?[^>]+(>|$)/g, "")
	}

	sendComment(taskId){
		console.log(this.comment);
		var data : any;
		if(this.files.length>0){
			data = new FormData();
			data.append("content",this.comment?this.comment:"");
			data.append("userId",this.currentUser._id);
			data.append("clientId",taskId);
			for(var i = 0; i < this.files.length; i++)
				data.append("fileUpload",this.files[i]);
		}else{
			data = {content:this.comment, userId: this.currentUser._id, taskId: taskId};
		}
		console.log(data);
		this._commentService.addComment(data).subscribe((res:any)=>{
			console.log(res);
			this.comment = "";
			this.model.editorData = 'Enter comments here';
			this.files = [];
			this.getAllCommentOfClinet(res.taskId);
		},err=>{
			console.error(err);
		})
	}

	getAllCommentOfClinet(taskId){
		this._commentService.getAllComments(taskId).subscribe(res=>{
			this.comments = res;
			console.log(this.comments);
		}, err=>{
			console.error(err);
		})
	}

	getAllUsers(){
		this._clientService.getAllUser().subscribe(res=>{
			this.projectTeam = res;
		},err=>{
			console.log(err);
		})
	}

}
