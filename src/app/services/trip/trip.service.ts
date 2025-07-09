import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { TripModel } from '../../models/tripModel';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  addTrip(trip: TripModel): Observable<ResponseModel<TripModel>>{
    return this.http.post<ResponseModel<TripModel>>(`${this.apiUrl}/trip/create`, trip)
  }

  getTrip(): Observable<ResponseModel<TripModel[]>>{
    return this.http.get<ResponseModel<TripModel[]>>(`${this.apiUrl}/trip/list`)
  }

  getTripById(tripId: string): Observable<ResponseModel<TripModel>>{
    return this.http.get<ResponseModel<TripModel>>(`${this.apiUrl}/trip/${tripId}`)
  }

  editTrip(tripId: string, trip: TripModel): Observable<ResponseModel<TripModel>>{
    return this.http.put<ResponseModel<TripModel>>(`${this.apiUrl}/trip/${tripId}`, trip)
  }

  deleteTrip(tripId: string): Observable<ResponseModel<TripModel>>{
    return this.http.delete<ResponseModel<TripModel>>(`${this.apiUrl}/trip/${tripId}`)
  }
}
