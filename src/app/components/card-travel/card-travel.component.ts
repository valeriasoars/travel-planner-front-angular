import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripModel } from '../../models/tripModel';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-travel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-travel.component.html',
  styleUrl: './card-travel.component.css',
})
export class CardTravelComponent {
  @Input() trip!: TripModel
  @Output() tripDeleted = new EventEmitter<string>()

  constructor(private router: Router, private tripService: TripService) {}

  navigateToPlanning() {
    this.router.navigate(['/', this.trip._id])
  }

  editTrip() {}

  deleteTrip() {
    this.tripService.deleteTrip(this.trip._id).subscribe({
      next: () => {
        this.tripDeleted.emit(this.trip._id)
      },
      error: (err) => {
        console.error('Erro ao deletar viagem:', err)
      },
    })
  }
}
