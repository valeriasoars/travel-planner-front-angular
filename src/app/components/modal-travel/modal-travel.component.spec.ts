import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTravelComponent } from './modal-travel.component';

describe('ModalTravelComponent', () => {
  let component: ModalTravelComponent;
  let fixture: ComponentFixture<ModalTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
