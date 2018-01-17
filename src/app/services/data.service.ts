import { Injectable } from '@angular/core';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;

  api_url = 'http://localhost:3000/api';
  allUsersUrl = `${this.api_url}/users/`;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get(this.allUsersUrl)
      .map(result => this.result = result.json().data);
  }

  getUser(id) {
    return this._http.get(this.allUsersUrl + id)
      .map(result => this.result = result.json().data);
  }

  deleteUser(id) {
    return this._http.delete(this.allUsersUrl + id)
      .map(result => this.result = result.json().data);
  }

  saverUser(person) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(
      {
        name: person.name,
        email: person.email,
        secretSanta: person.secretSanta
      }
    );
    return this._http.post(this.allUsersUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateUser(id,person) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(
      {
        name: person.name,
        email: person.email,
        secretSanta: person.secretSanta
      }
    );
    return this._http.put(this.allUsersUrl + id, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = body.errorMessage;
    } else {
      errMsg = "Por favor, conecte-se à internet e tente novamente.";
    }
    if (!errMsg) {
      errMsg = "Por favor, conecte-se à internet e tente novamente.";
    }

    return Observable.throw(errMsg);
  }

}
