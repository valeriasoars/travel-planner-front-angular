import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, CommonModule, RouterLink],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {
  formsAtual: 'login' | 'register'  = 'register'

  constructor(private route: ActivatedRoute){
    this.route.params.subscribe(params => {
      if(params['tipo'] == 'login' || params['tipo'] === 'register'){
        this.formsAtual = params['tipo']
      }else{
        this.formsAtual = 'register'
      }
    })
  }

  // mostrarForms(tipo: 'login' | 'register'){
  //   this.formsAtual = tipo  
  // }
}
