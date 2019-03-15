import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClientsService {
	addTracksEvent = new EventEmitter();
	updateTracksEvent = new EventEmitter();
	tracksIndex = new EventEmitter();
	deleteTrackId = new EventEmitter();
	addClientEvent = new EventEmitter();
	constructor(public http: HttpClient) { }

	getAllClient(){
		return this.http.get(config.baseApiUrl+"/client/all");
	}

	getSingleClient(clientId){
		return this.http.get(config.baseApiUrl+"/client/"+clientId);
	}

	addClient(data){
		return this.http.post(config.baseApiUrl+"/client/add", data).pipe(map(client => {
                console.log("login user=========>", client);
                this.addClientEvent.emit(client);
                return client;
            }));
	}

	editClient(data){
		return this.http.put(config.baseApiUrl+"/client/update/"+data._id, data);
	}

	updateClientStatus(data){
		return this.http.put(config.baseApiUrl+"/client/update-status/"+data._id, data);
	}

	deleteClient(clientId){
		return this.http.delete(config.baseApiUrl+"/client/"+clientId);
	}

	deleteMultipleClient(clientIds){
		return this.http.delete(config.baseApiUrl+"/client/multiple", clientIds);
	}

	getAllUser(){
		return this.http.get(config.baseApiUrl+"/user/all");
	}

	getAllCommunication(){
		return this.http.get(config.baseApiUrl+"/communication/all");
	}

	addTrack(data){
		return this.http.post(config.baseApiUrl+"/tracks/add", data)
		.pipe(map(track => {
                console.log("login user=========>", track);
                this.addTracksEvent.emit(track);
                return track;
            }));
	}

	getAllTracks(){
		return this.http.get(config.baseApiUrl+"/tracks/all");
	}

	updateTrack(data){
		return this.http.put(config.baseApiUrl+"/tracks/update/"+data._id, data).pipe(map(track => {
                console.log("login user=========>", track);
                this.updateTracksEvent.emit(track);
                return track;
            }));
	}

	updateTrackIndex(data){
		return this.http.put(config.baseApiUrl+"/tracks/update-index/"+data.data._id, data).pipe(map(track => {
                console.log("login user=========>", track);
                this.tracksIndex.emit(track);
                return track;
            }));
	}

	deleteTrack(trackId){
		return this.http.delete(config.baseApiUrl+"/tracks/delete/"+trackId).pipe(map(track => {
                console.log("login user=========>", track);
                this.deleteTrackId.emit(track);
                return track;
            }));
	}
}
