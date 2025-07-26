import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddActivityComponent } from './modal-add-activity.component';

describe('ModalAddActivityComponent', () => {
  let component: ModalAddActivityComponent;
  let fixture: ComponentFixture<ModalAddActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
