import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddExpenseComponent } from './modal-add-expense.component';

describe('ModalAddExpenseComponent', () => {
  let component: ModalAddExpenseComponent;
  let fixture: ComponentFixture<ModalAddExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
