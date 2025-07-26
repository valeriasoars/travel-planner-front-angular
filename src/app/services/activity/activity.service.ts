import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivityModel } from '../../models/activityModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  addActivity(planningId: string, activity: ActivityModel): Observable<ResponseModel<ActivityModel>> {
    return this.http.post<ResponseModel<ActivityModel>>(`${this.apiUrl}/activity/${planningId}`, activity)
  }

  getActivityByPlannerId(planningId: string): Observable<ResponseModel<ActivityModel[]>>{
    return this.http.get<ResponseModel<ActivityModel[]>>(`${this.apiUrl}/activity/${planningId}`)
  }

  editActivity(activityId: string, activity: ActivityModel): Observable<ResponseModel<ActivityModel>>{
    return this.http.put<ResponseModel<ActivityModel>>(`${this.apiUrl}/activity/${activityId}`, activity)
  }

  deleteActivity(activityId: string): Observable<ResponseModel<ActivityModel>>{
    return this.http.delete<ResponseModel<ActivityModel>>(`${this.apiUrl}/activity/${activityId}`)
  }
}
