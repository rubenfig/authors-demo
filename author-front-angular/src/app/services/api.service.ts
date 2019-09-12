import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.API_URL;
  path = '';
  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      // tslint:disable-next-line:forin
      for (const k in params) {
        if (params[k]){
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.url + '/' + endpoint, reqOpts).pipe(
      catchError(this.handleError)
    );
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts).pipe(
      catchError(this.handleError)
    );
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts).pipe(
      catchError(this.handleError)
    );
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts).pipe(
      catchError(this.handleError)
    );
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    return throwError({error: true,
      message: error.error ? error.error.message : 'Error!'});
  }


  list(params?) {
    return this.get(`${this.path}/`, params);
  }

  getOne(id) {
    return this.get(`${this.path}/${id}`);
  }
}
