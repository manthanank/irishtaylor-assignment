import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { RouterLink } from '@angular/router';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { NgClass } from '@angular/common';
import { ChartsComponent } from "../charts/charts.component";
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink, ViewDetailsComponent, NgClass, ChartsComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  items: Item[] = []; // Array to hold the list of items
  selectedItem: Item | null = null; // To hold the selected item

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    // Fetch items when the component initializes
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  deleteItem(id: number): void {
    // Delete an item by its ID
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter((item) => item._id !== id); // Remove the item from the list
      this.closeDeleteModal(); // Close the delete confirmation modal
    });
  }

  viewItem(item: Item): void {
    this.selectedItem = item; // Set the selected item
    const modal = document.getElementById('itemModal'); // Get modal element
    if (modal) {
      modal.style.display = 'block'; // Show the modal
    }
  }

  closeModal(): void {
    const modal = document.getElementById('itemModal'); // Get modal element
    if (modal) {
      modal.style.display = 'none'; // Hide the modal
    }
    this.selectedItem = null; // Clear the selected item
  }

  closeDeleteModal(): void {
    const modal = document.getElementById('deleteModal'); // Get modal element
    if (modal) {
      modal.style.display = 'none'; // Hide the modal
    }
  }

  openDeleteModal(id: number): void {
    const modal = document.getElementById('deleteModal'); // Get modal element
    if (modal) {
      modal.style.display = 'block'; // Show the modal
    }
    this.selectedItem = this.items.find((item) => item._id === id) ?? null; // Set the selected item
  }
}
