import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DemoService {

    selectedRepo: string;
    REGISTRY_URL = 'https://registry.segip.gob.bo';

    /**
     *
     */
    constructor(private http: HttpClient) {}

    getCatalog(): Observable<any> {
        const username  = 'dockeradmin';
        const password = 'dockerAdmin2k18';

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`);

        return this.http.get(`${this.REGISTRY_URL}/v2/_catalog`, {headers: headers});
    }

    getTags(): Observable<any> {
        return this.http.get(`${this.REGISTRY_URL}/${this.selectedRepo}/tags/list`);
    }
}
