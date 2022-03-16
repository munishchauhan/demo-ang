import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { environment } from 'src/environments/environment';
 
const authLocalStorageToken = `${environment.USERDATA_KEY}`;

@Injectable()
export class RepositoryService {
  selectedSession: string;

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getDataNoAuth(route: string): Observable<any> {
    return this.http.get(this.createCompleteRoute(route, this.envUrl.apiUrl));
  }

  public getData(route: string): Observable<any> {
    return this.http.get(this.createCompleteRoute(route, this.envUrl.apiUrl), this.generateHeaders());
  }

  public create(route: string, body): Observable<any> {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.apiUrl), body, this.generateHeaders());
  }

  public update(route: string, body): Observable<any> {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.apiUrl), body, this.generateHeaders());
  }

  public delete(route: string): Observable<any> {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.apiUrl));
  }

  uploadFile(route: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(this.createCompleteRoute(route, this.envUrl.apiUrl), formData, this.generateHeaders());
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    const user = JSON.parse(localStorage.getItem(authLocalStorageToken));

    let token: string;
    if (user) {
      token = user.accessToken;
    }

    return {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
          Authorization: 'Bearer ' + token
        })
    };
  }

}
