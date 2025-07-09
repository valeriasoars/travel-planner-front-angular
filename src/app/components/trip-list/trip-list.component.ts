import { Component } from '@angular/core';
import { TripModel } from '../../models/tripModel';
import { TripService } from '../../services/trip/trip.service';
import { CardTravelComponent } from '../card-travel/card-travel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CardTravelComponent, CommonModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css',
})
export class TripListComponent {
  trips: TripModel[] = []

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getTrip().subscribe({
      next: (res) => (this.trips = res.data),
      error: (err) => console.error('Erro ao carregar viagens:', err),
    })
  }

  loadTrips() {
    this.tripService.getTrip().subscribe({
      next: (res) => this.trips = res.data,
      error: (err) => console.error('Erro ao carregar viagens:', err)
    })
  }

  onTripDeleted(tripId: string) {
    this.trips = this.trips.filter((t) => t._id !== tripId)
  }

  public refreshTrips() {
    this.loadTrips();
  }
}
