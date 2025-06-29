import { Component, OnInit } from '@angular/core';
import { FormsComponent } from "../../components/forms/forms.component";
import { AuthService } from '../../services/auth.service';
import { RegisterModel } from '../../models/registerModel';
import {  ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {
  textoTitulo = "Crie sua conta"
  textoDescricao = "Já registrado? Entre na sua conta"
  btnAcao = "Cadastre-se"

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  registerUser(user: RegisterModel){
    this.authService.register(user).subscribe({
        next: (response) => {
          if (response.data != null) {
            this.toastr.success(response.message, 'Sucesso!')
            this.router.navigate(['/initial/login']);
          } else {
            this.toastr.error(response.message, 'Erro!')
          }
        },
        error: (err) => {
          const mensagemErro = err?.error?.error || 'Erro inesperado ao cadastrar.'
          this.toastr.error(mensagemErro, 'Erro!')
        }
      })
  }


}
