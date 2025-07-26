import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { InformationTravelComponent } from '../../components/information-travel/information-travel.component';
import { BudgetService } from '../../services/budget/budget.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpenseCategoryService } from '../../services/expense-category/expense-category.service';
import { CategoryExpenseModel } from '../../models/categoryExpenseModel';
import { ExpenseModel } from '../../models/expenseModel';
import { BalanceModel } from '../../models/balanceModel';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TripService } from '../../services/trip/trip.service';
import { TripModel } from '../../models/tripModel';
import { ModalAddExpenseComponent } from "../../components/modal-add-expense/modal-add-expense.component";

registerLocaleData(localePt);

@Component({
  selector: 'app-budget-travel',
  standalone: true,
  imports: [InformationTravelComponent, CommonModule, ReactiveFormsModule, ModalAddExpenseComponent],
  templateUrl: './budget-travel.component.html',
  styleUrl: './budget-travel.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class BudgetTravelComponent implements OnInit{
  categories: CategoryExpenseModel[] = []
  expenses: ExpenseModel[] = []
  tripId: string = ''
  balance!: BalanceModel
  trip?: TripModel

  isModalOpen = false;

  constructor(
    private budgetService: BudgetService,
    private expenseCategoryService: ExpenseCategoryService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.paramMap.get('id') ?? ''

    this.getCategory()
    this.getBalance()
  }

  openAddExpenseModal() {
    this.isModalOpen = true;
  }

  closeAddExpenseModal() {
    this.isModalOpen = false;
    this.loadData();
  }

  loadData() {
    this.getExpense();   
    this.getBalance();   
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

  deleteExpense(id: string){
    this.budgetService.deleteExpense(id).subscribe({
      next: () => {
        this.expenses = this.expenses.filter((e) => e._id !== id)
        this.getBalance()
      },
      error: (error) => {
        console.error('Erro ao deletar despesa:', error)
      }
    })
  }

  get percentageSpent(): number{
    if(!this.balance || this.balance.budget === 0){
      return 0
    }

    return (this.balance.totalSpent / this.balance.budget) * 100
  }

  getCategoryName(categoryId: any): string{
    const id = typeof categoryId === 'object' ? categoryId._id : categoryId
    const category = this.categories.find((cat) => cat._id === id)
    return category ? category.name : 'Categoria não encontrada'
  }
}
