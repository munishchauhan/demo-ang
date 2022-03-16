import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class EnvironmentUrlService {

  public apiUrl: string = environment.apiUrl;
  
  constructor() { }
}
