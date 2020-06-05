import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../interface/login';
import {Observable} from 'rxjs';
import {DataVo} from '../interface/dataVo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api = 'http://localhost:8080/api/v1/user/login';

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<DataVo> {
    return this.http.post<DataVo>(this.api, login);
  }

}
