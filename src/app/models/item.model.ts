/**
 * Represents an item with an ID, name, and email.
 */
export interface Item {
  _id: number;
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}
