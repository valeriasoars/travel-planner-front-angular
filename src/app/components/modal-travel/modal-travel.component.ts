import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripService } from '../../services/trip/trip.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-travel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-travel.component.html',
  styleUrl: './modal-travel.component.css'
})
export class ModalTravelComponent implements OnInit {
  @Output() close = new EventEmitter<void>()
  @Output() tripAdded = new EventEmitter<void>()

  tripForm!: FormGroup

  constructor( private tripService: TripService, private fb: FormBuilder, private toastr: ToastrService){}

  ngOnInit(): void {
    this.formsTrip()
  }

  formsTrip(){
    this.tripForm = this.fb.group({
      destination: ['', [Validators.required]],
      totalBudget: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    })
  }

  addTrip(){
    if(this.tripForm.invalid) return

    const formValue = this.tripForm.value

    this.tripService.addTrip(formValue).subscribe({
      next: (response) => {
        if(response.data != null){
          this.tripForm.reset()
          this.tripAdded.emit()
          this.close.emit()
          this.toastr.success(response.message, 'Sucesso!')
        }else{
          this.toastr.error(response.message, 'Erro!')
        }
      }, error: (err) => {
        const mensagemErro = err?.error?.error || 'Erro inesperado ao criar viagem.'
        this.toastr.error(mensagemErro, 'Erro!')
        console.error('Erro ao criar viagem:', err)

      }
    })
  }

  closeModal(){
    this.close.emit()
  }
}
