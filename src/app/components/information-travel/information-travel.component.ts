import { Component, Input, OnInit } from '@angular/core';
import { TripModel } from '../../models/tripModel';
import { TripService } from '../../services/trip/trip.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-information-travel',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './information-travel.component.html',
  styleUrl: './information-travel.component.css'
})
export class InformationTravelComponent  implements OnInit {
  @Input() trip?: TripModel
  tripId?: string;

  constructor(private tripService: TripService, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
      if (tripId) {
      this.getTrip(tripId);
      } else {
      console.error('ID da viagem não fornecido na rota.');
      } 
  }
  
  getTrip(id: string){
    this.tripService.getTripById(id).subscribe({
      next:(response) =>{
        this.trip = response.data;
      },
      error: (error) => {
        console.error('Erro ao buscar viagem:', error);
      }
    })
  }
  
  desconect() {
    this.authService.logout()
  }


}
