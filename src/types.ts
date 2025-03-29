export interface Tour {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  latitude?: number;
  longitude?: number;
  availableSeats?: number;
  companyName?: string;
  companyLogo?: string;
  included?: string[];
  excluded?: string[];
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  confirmEmail: string;
  phone: string;
  numberOfAdults: number;
  numberOfChildren: number;
}