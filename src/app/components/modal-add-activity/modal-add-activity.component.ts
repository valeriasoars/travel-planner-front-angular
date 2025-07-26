import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivityService } from '../../services/activity/activity.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-add-activity',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add-activity.component.html',
  styleUrl: './modal-add-activity.component.css'
})
export class ModalAddActivityComponent implements OnInit {
  @Input() planningId!: string
  @Output() close = new EventEmitter<void>()
  @Output() activityAdded = new EventEmitter<void>()

  activityForm!: FormGroup

  constructor(private fb: FormBuilder, private acttivityService: ActivityService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      activity: [''],
      observation:[],
      time: [],
      location: []
    })
  }

  addActivity(){
    if(this.activityForm.invalid) return

    const formValue = this.activityForm.value

    this.acttivityService.addActivity(this.planningId, formValue).subscribe({
      next: (response) =>{
        if(response.data != null){
          this.activityForm.reset()
          this.activityAdded.emit()
          this.close.emit()
          this.toastr.success(response.message, 'Sucesso!')
        }else{
          this.toastr.error(response.message, 'Erro!')
        }

      }, error: (err) =>{
        const mensagemErro = err?.error?.error || 'Erro inesperado ao criar atividade.'
        this.toastr.error(mensagemErro, 'Erro!')
        console.error('Erro ao criar atividade:', err)
      }
    })
  }

  closeModal(){
    this.close.emit()
  }


}
