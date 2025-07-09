import { Component } from '@angular/core';
import { FormsComponent } from "../../components/forms/forms.component";
import { LoginModel } from '../../models/loginModel';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  textoTitulo = "Entre em sua conta"
  textoDescricao = "Não tem uma conta? Inscreva-se"
  btnAcao = "Entrar"

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  loginUser(user: LoginModel){
    this.authService.login(user).subscribe({
      next:(response) => {
        if(response.data != null){
          localStorage.setItem('token', response.data.token)
          this.toastr.success(response.message, 'Sucesso!')
          this.router.navigate(['/dashboard'])
        }else{
          this.toastr.error(response.message, 'Erro!')
        }
      },
      error:(err) => {
        const mensagemErro = err?.error?.error || 'Erro inesperado ao cadastrar.'
        this.toastr.error(mensagemErro, 'Erro!')
        
      }
    })
  }
}
