import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryTravelComponent } from './itinerary-travel.component';

describe('ItineraryTravelComponent', () => {
  let component: ItineraryTravelComponent;
  let fixture: ComponentFixture<ItineraryTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItineraryTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
