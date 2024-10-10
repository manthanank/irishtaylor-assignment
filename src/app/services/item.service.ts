import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // API URL for CRUD operations
  private itemSource = new BehaviorSubject<Item[]>([]); // BehaviorSubject to hold the list of items
  items$ = this.itemSource.asObservable(); // Observable for the items list

  constructor(private http: HttpClient) {}

  // Fetch all items from the API
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // Fetch a single item by ID from the API
  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  // Create a new item via the API
  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  // Update an existing item via the API
  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item.id}`, item);
  }

  // Delete an item by ID via the API
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update the local items list
  updateItems(items: Item[]): void {
    this.itemSource.next(items);
  }
}