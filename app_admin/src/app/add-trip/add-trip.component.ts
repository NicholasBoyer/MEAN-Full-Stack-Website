import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trips';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addForm.valid) {
      const token = this.authenticationService.getToken();
      this.tripDataService.addTrip(this.addForm.value, token)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['/list-trips']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  get f() { return this.addForm.controls; }
}
