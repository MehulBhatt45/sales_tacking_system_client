import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';

@Injectable({
	providedIn: 'root'
})
export class ClientsService {

	constructor(public http: HttpClient) { }

	getAllClient(){
		return this.http.get(config.baseApiUrl+"/client/all");
	}

	getSingleClient(clientId){
		return this.http.get(config.baseApiUrl+"/client/"+clientId);
	}

	addClient(data){
		return this.http.post(config.baseApiUrl+"/client/add", data);
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
}
