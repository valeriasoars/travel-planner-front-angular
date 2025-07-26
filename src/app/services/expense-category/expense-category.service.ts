import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {  CategoryExpenseModel } from '../../models/categoryExpenseModel';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {
  
  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  getCategory(): Observable<ResponseModel<CategoryExpenseModel[]>>{
    return this.http.get<ResponseModel<CategoryExpenseModel[]>>(`${this.apiUrl}/categoryExpense`)
  }

  getCategoryById(categoryId: string): Observable<ResponseModel<CategoryExpenseModel>>{
    return this.http.get<ResponseModel<CategoryExpenseModel>>(`${this.apiUrl}/categoryExpense/${categoryId}`)
  }
}
