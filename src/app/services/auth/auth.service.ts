import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginModel } from '../../models/loginModel';
import { ResponseModel } from '../../models/responseModel';
import { RegisterModel } from '../../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient, private router: Router) { }

  login(login: LoginModel): Observable<ResponseModel<LoginModel>>{
    return this.http.post<ResponseModel<LoginModel>>(`${this.apiUrl}/user/login`, login)
  }

  register(register: RegisterModel): Observable<ResponseModel<RegisterModel>>{
    return this.http.post<ResponseModel<RegisterModel>>(`${this.apiUrl}/user/register`, register)
  }
}
