import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalTravelComponent } from '../modal-travel/modal-travel.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripService } from '../../services/trip/trip.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, ModalTravelComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() novaViagem = new EventEmitter<void>();

  emitirNovaViagem() {
    this.novaViagem.emit();
  }

  ngAfterViewInit(): void {
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');

    menuToggle?.addEventListener('click', () => {
      wrapper?.classList.toggle('toggled');
    });
  }

  desconect() {}
}
