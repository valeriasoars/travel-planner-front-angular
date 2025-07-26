import { Component, EventEmitter, LOCALE_ID, OnInit, Output } from '@angular/core';
import { InformationTravelComponent } from "../../components/information-travel/information-travel.component";
import { DailyPlanningModel } from '../../models/dailyPlanningModel';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityModel } from '../../models/activityModel';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip/trip.service';
import { ToastrService } from 'ngx-toastr';
import { DaysService } from '../../services/days/days.service';
import { ActivityService } from '../../services/activity/activity.service';
import { TripModel } from '../../models/tripModel';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ModalAddActivityComponent } from "../../components/modal-add-activity/modal-add-activity.component";

registerLocaleData(localePt)

@Component({
  selector: 'app-itinerary-travel',
  standalone: true,
  imports: [InformationTravelComponent, CommonModule, ReactiveFormsModule, ModalAddActivityComponent],
  templateUrl: './itinerary-travel.component.html',
  styleUrl: './itinerary-travel.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ItineraryTravelComponent implements OnInit{

  tripId?: string
  trip?: TripModel
  days: DailyPlanningModel[] = []

  activityForm!: FormGroup
  selectedDayId!: string
  activities: ActivityModel[] = []
  openDays: boolean[] = []

  isModalOpen = false

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private daysService: DaysService,
    private activityService: ActivityService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.paramMap.get('id')!;

    this.tripService.getTripById(this.tripId).subscribe({
      next: (response) => (this.trip = response.data),
      error: (err) => console.error('erro', err),
    });

    this.daysService.getDaysByTripId(this.tripId).subscribe({
      next: (response) => {
        this.days = response.data.map((d: any) => ({
          ...d,
          data: this.normalizeDate(d.date),
        }));

        this.days.forEach((day) => {
          this.getActivity(day._id);
        });
      },
      error: (err) => console.error('Erro ao carregar dias', err),
    });

    this.formsActivity();
  }

  formsActivity() {
    this.activityForm = this.fb.group({
      activity: ['', [Validators.required]],
      observation: ['', [Validators.required]],
      time: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  setSelectedDay(dayId: string) {
    console.log('Abrindo modal para o dia:', dayId);
    this.selectedDayId = dayId;
    this.isModalOpen = true
  }

  onModalClose() {
    this.isModalOpen = false; 
     this.selectedDayId = ''
  }

  onActivityAdded(){
    if(this.selectedDayId){
      this.getActivity(this.selectedDayId)
    }
    this.onModalClose();
  }

  getActivity(id: string) {
    this.activityService.getActivityByPlannerId(id).subscribe({
      next: (response) => {
        console.log('Atividades recebidas:', response.data);

        this.activities = this.activities.filter(
          (a) => a.planningId !== id
        );
        this.activities.push(...response.data);
      },
      error: (err) => {
        console.error('Erro ao buscar atividades:', err);
      },
    });
  }

  getActivitiesByDay(dayId: string): ActivityModel[] {
    return this.activities.filter(
      (activity) => activity.planningId === dayId
    );
  }

  normalizeDate(dateStr: string): Date {
    const dateOnly = dateStr.split('T')[0]; // Pega apenas a parte da data (YYYY-MM-DD)
    const [year, month, day] = dateOnly.split('-').map(Number);
    return new Date(year, month - 1, day); // month - 1 porque Date() usa índice 0-11 para meses
  }
}
