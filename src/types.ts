export interface Resource {
  id: string;
  title: string;
  category: 'textbook' | 'electronics' | 'supplies' | 'research' | 'other';
  description: string;
  owner: string;
  location: string;
  availability: 'available' | 'borrowed' | 'reserved';
  condition: 'like-new' | 'good' | 'fair' | 'used';
  price: number;
  imageUrl?: string;
  link?: string; // External link for digital resources
  createdAt: string; // ISO string
}
