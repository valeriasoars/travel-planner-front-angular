import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginModel } from '../../models/loginModel';
import { RegisterModel } from '../../models/registerModel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit{

  @Input() textoTitulo!: String
  @Input() textoDescricao!: String
  @Input() btnAcao!: String
  @Input() dadosUsuario:  RegisterModel | LoginModel  | null = null

  @Output() onSubmit = new EventEmitter()

  userForm!:FormGroup

  constructor(private toastr: ToastrService){}

  ngOnInit(): void {

    const isRegister = this.btnAcao == "Cadastre-se"

    this.userForm = new FormGroup({
      name: new FormControl(this.dadosUsuario  && 'name' in this.dadosUsuario ? this.dadosUsuario.name : '', isRegister ? Validators.required : []),
      email: new FormControl(this.dadosUsuario ? this.dadosUsuario.email : '', [Validators.required, Validators.email]),
      password: new FormControl(this.dadosUsuario ? this.dadosUsuario.password : '', [Validators.required]),
      confirmedPassword: new FormControl(this.dadosUsuario && 'confirmedPassword' in this.dadosUsuario ? this.dadosUsuario.confirmedPassword: '', isRegister ? Validators.required : [])
    })
  }

  submit(){
    if(this.userForm.valid){
      if(this.dadosUsuario && (this.dadosUsuario as RegisterModel).name){
        this.onSubmit.emit(this.userForm.value as RegisterModel)
      }else{
        this.onSubmit.emit(this.userForm.value as LoginModel)
      }
    }else{
      this.userForm.markAllAsTouched()
    }
  }
}
