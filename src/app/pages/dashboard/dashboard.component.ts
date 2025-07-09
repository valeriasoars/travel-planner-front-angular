import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TripListComponent } from '../../components/trip-list/trip-list.component';
import { TripService } from '../../services/trip/trip.service';
import { ModalTravelComponent } from '../../components/modal-travel/modal-travel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    TripListComponent,
    ModalTravelComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  @ViewChild(TripListComponent) tripListRef!: TripListComponent;

  mostrarModal = false;
  openModal() {
    this.mostrarModal = true;
  }

  closeModal() {
    this.mostrarModal = false;
  }

  handleTripAdded() {
    this.tripListRef.refreshTrips();
    this.closeModal();
  }
}
