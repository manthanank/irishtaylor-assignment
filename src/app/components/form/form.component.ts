import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  form!: FormGroup; // Form group to handle form controls
  id!: number; // ID of the item being edited

  constructor(
    private fb: FormBuilder, // FormBuilder to create form controls
    private itemService: ItemService, // Service to handle item operations
    private route: ActivatedRoute, // ActivatedRoute to get route parameters
    private router: Router // Router to navigate between routes
  ) { }

  ngOnInit(): void {
    // Get the ID from the route parameters
    this.id = this.route.snapshot.params['id'];
    
    // Initialize the form with default values and validators
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // If an ID is present, fetch the item and patch the form values
    if (this.id) {
      this.itemService.getItem(this.id).subscribe(item => this.form.patchValue(item));
    }
  }

  onSubmit(): void {
    // If the form is invalid, do nothing
    if (this.form.invalid) return;

    // Create an item object from the form values
    const item: Item = this.form.value;

    // If an ID is present, update the item, otherwise create a new item
    if (this.id) {
      item._id = this.id;
      this.itemService.updateItem(item).subscribe(() => this.router.navigate(['/list']));
    } else {
      this.itemService.createItem(item).subscribe(() => this.router.navigate(['/list']));
    }
  }

  cancel(): void {
    // Navigate back to the list view
    this.router.navigate(['/list']);
  }
}