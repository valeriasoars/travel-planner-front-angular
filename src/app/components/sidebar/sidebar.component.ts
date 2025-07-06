import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  ngAfterViewInit(): void {
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');

    menuToggle?.addEventListener('click', () => {
      wrapper?.classList.toggle('toggled');
    });
  }

  desconect(){}
}
