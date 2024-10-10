import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css',
})
export class ViewDetailsComponent implements OnChanges {
  @Input() item: Item | null = null; // Receive item data from parent
  form: FormGroup; // Form group to handle form controls and validation

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values and validators
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Disable the form controls initially
    this.disableFormControls();
  }

  // Detect changes when a new item is passed from the parent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.item) {
      // Update the form values with the new item data
      this.form.patchValue({
        name: this.item.name,
        email: this.item.email,
      });

      // Disable the form controls
      this.disableFormControls();
    }
  }

  // Method to disable the form controls
  private disableFormControls(): void {
    this.form.controls['name'].disable();
    this.form.controls['email'].disable();
  }
}
