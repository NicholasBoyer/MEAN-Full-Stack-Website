import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn’t find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('EditTripComponent::ngOnInit');
    console.log('tripcode:' + tripCode);
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value;
          // Populate our record into the form
          this.editForm.patchValue(value[0]);
          if (!value) {
            this.message = 'No Trip Retrieved!';
          } else {
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      if (this.authService.isLoggedIn()) {
        const token = this.authService.getToken();
        this.tripDataService.updateTrip(this.editForm.value, token)
          .subscribe({
            next: (value: any) => {
              console.log(value);
              this.router.navigate(['/list-trips']);
            },
            error: (error: any) => {
              console.log('Error: ' + error);
            }
          });
      } else {
        this.message = 'You must be logged in to save a trip.';
        console.log(this.message);
      }
    }
  }

  get f() { return this.editForm.controls; }
}
