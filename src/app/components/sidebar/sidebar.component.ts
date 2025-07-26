import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() novaViagem = new EventEmitter<void>();


  constructor(private authService: AuthService){}

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

  desconect() {
    this.authService.logout()
  }
}
