import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment'; //path to your environment files

@Injectable()
export class ConfigService {

    private config: Object = null;
    private env:    Object = null;

    constructor(private http: HttpClient) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.env = 'dev';
            if (environment.production)
                this.env = 'prod';
            
                //let request:any = null;



            //     switch (this.env) {
            //     case 'production': {
            //         request = this.http.get('../../../assets/' + this.env + '.config.json');
            //     } break;

            //     case 'development': {
            //         request = this.http.get('config.' + envResponse.env + '.json');
            //     } break;

            //     case 'default': {
            //         console.error('Environment file is not set or invalid');
            //         resolve(true);
            //     } break;
            // }
            //../../../assets/config/' + 
            this.http.get('../../../assets/config/' + this.env + '.config.json')
                    // .catch((error: any) => {
                    //     console.error('Error reading ' + this.env + ' configuration file');
                    //     resolve(error);
                    //     return Observable.throw(error.json().error || 'Server error');
                    // })
                    .subscribe((responseData) => {
                        this.config = responseData;
                        resolve(true);
                    });
           

            // this.http.get('env.json').map( res => res.json() ).catch((error: any):any => {
            //     console.log('Configuration file "env.json" could not be read');
            //     resolve(true);
            //     return Observable.throw(error.json().error || 'Server error');
            // }).subscribe( (envResponse) => {
            //     this.env = envResponse;
            //     let request:any = null;

                
            // });

        });
    }    
}

