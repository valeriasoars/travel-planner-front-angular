import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpenseCategoryService } from '../../services/expense-category/expense-category.service';
import { BudgetService } from '../../services/budget/budget.service';
import { TripService } from '../../services/trip/trip.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryExpenseModel } from '../../models/categoryExpenseModel';
import { ExpenseModel } from '../../models/expenseModel';
import { BalanceModel } from '../../models/balanceModel';
import { TripModel } from '../../models/tripModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-add-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-expense.component.html',
  styleUrl: './modal-add-expense.component.css'
})
export class ModalAddExpenseComponent implements OnInit {

  @Output() close = new EventEmitter<void>()
  @Output() expenseAdded = new EventEmitter<void>()
  @Input() tripId!: string

  expenseForm!: FormGroup

  categories: CategoryExpenseModel[] = []
  expenses: ExpenseModel[] = []
  
  balance!: BalanceModel
  trip?: TripModel

  constructor(
    private budgetService: BudgetService,
    private expenseCategoryService: ExpenseCategoryService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {}
  
  ngOnInit(){

    this.expenseForm = this.fb.group({
      categoryExpenseId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      value: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })

    this.getCategory()
    this.getBalance()
  }

  addExpense(){
    if(this.expenseForm.invalid){
      this.toast.error('Preencha todos os campos corretamente.')
      return
    }

    const formValue = this.expenseForm.value
    const newExpense = {
      ...formValue,
      date: new Date(formValue.date).toISOString()
    }

    console.log('Objeto enviado para o backend:', newExpense)

    this.budgetService.addExpense(this.tripId, newExpense).subscribe({
      next: () => {
        this.expenseForm.reset()
        this.expenseAdded.emit()
        this.close.emit()
        this.getExpense()
        this.getBalance()
        this.toast.success('Despesa adicionada com sucesso')
      }, 
      error: (err) => {
        console.error('Erro ao adicionar despesa', err)

        if(err?.error?.message){
          this.toast.error(err.error.erro, 'Erro')
        }else{
          this.toast.error('Erro ao salvar despesa', 'Erro')
        }
      }
    })
  }

  getExpense(){
    this.budgetService.getExpenseByTrip(this.tripId).subscribe({
      next: (response) =>{
        this.expenses = response.data
      },
        error: (err) => {
        console.error('Erro ao carregar despesas', err);
      }
    })
  }

  getCategory(){
    this.expenseCategoryService.getCategory().subscribe({
      next: (response) => {
        this.categories = response.data
        this.getExpense()
      },
      error: (err) => {
        console.error('Erro ao carregar categorias', err)
      }
    })
  }

  getBalance(){
    this.budgetService.getRemainingBalance(this.tripId).subscribe({
      next: (response) => {
        this.balance = response.data
      },
      error: (err) => {
        console.error('Erro ao carregar saldo', err);
      }
    })
  }

  closeModal(){
    this.close.emit()
  }
}
