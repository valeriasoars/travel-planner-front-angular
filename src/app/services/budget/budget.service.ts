import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { ExpenseModel } from '../../models/expenseModel';
import { BalanceModel } from '../../models/balanceModel';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  getExpenseByTrip(tripId: string): Observable<ResponseModel<ExpenseModel[]>>{
    return this.http.get<ResponseModel<ExpenseModel[]>>(`${this.apiUrl}/expense/${tripId}`)
  }

  getRemainingBalance(tripId: string): Observable<ResponseModel<BalanceModel>>{
    return this.http.get<ResponseModel<BalanceModel>>(`${this.apiUrl}/expense/balance/${tripId}`)
  }

  addExpense(tripId: string, expense: ExpenseModel): Observable<ResponseModel<ExpenseModel>>{
    return this.http.post<ResponseModel<ExpenseModel>>(`${this.apiUrl}/expense/${tripId}`, expense)
  }

  updateExpense(expenseId: string, expense: ExpenseModel): Observable<ResponseModel<ExpenseModel>>{
    return this.http.put<ResponseModel<ExpenseModel>>(`${this.apiUrl}/expense/${expenseId}`, expense)
  }

  deleteExpense(expenseId: string): Observable<ResponseModel<ExpenseModel>>{
    return this.http.delete<ResponseModel<ExpenseModel>>(`${this.apiUrl}/expense/${expenseId}`)
  }
}
