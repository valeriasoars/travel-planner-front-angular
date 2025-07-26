import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyPlanningModel } from '../../models/dailyPlanningModel';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  getDaysByTripId(tripId: string): Observable<ResponseModel<DailyPlanningModel[]>> {
    return this.http.get<ResponseModel<DailyPlanningModel[]>>(`${this.apiUrl}/planning/${tripId}`);
  }
}
