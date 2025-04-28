// src/services/api.ts
import axios from 'axios';

export const API_BASE_URL = 'https://journeymate.runasp.net';

export interface Company {
  id: number;
  userId: string;
  companyName: string;
  address: string;
  description: string;
  type?: string;
  slogan?: string;
  rating: number;
  verified?: boolean;
  coverImage?: string;
  logo?: string;
  profileImageUrl?: string;
  establishedDate?: string;
  email?: string;
  phone?: string;
  location?: string;
  website: string;
  socialMediaLinks?: string[];
  paymentMethods?: string[];
  destinations?: string[];
  specialties?: string[];
  reviewsCount?: number;
  reviews?: Review[];
  workingHours?: WorkingHours[];
  posts?: Post[];
  photos?: string[];
  similarCompanies?: SimilarCompany[];
  upcomingTravels?: UpcomingTravel[];
  travels?: any[];
  ratings?: any[];
  latitude?: number | null;
  longitude?: number | null;
}

interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}


interface WorkingHours {
  day: string;
  hours: string;
}

interface Post {
  id: number;
  userName: string;
  userProfile: string;
  time: string;
  text: string;
  image?: string;
}

interface SimilarCompany {
  id: number;
  name: string;
  image: string;
  email: string;
}

interface UpcomingTravel {
  id: number;
  location: string;
  image: string;
  date: string;
  daysLeft: number;
}

export const getCompanies = async (): Promise<{items: Company[], totalCount: number}> => {
  try {
    const response = await axios.get<{items: Company[], totalCount: number}>(`${API_BASE_URL}/api/Company`);
    console.log('API Companies Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const getCompanyDetails = async (id: number): Promise<Company | null> => {
  try {
    const response = await axios.get<Company>(`${API_BASE_URL}/api/Company/${id}`);
    console.log('Company Details Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching company ${id} details:`, error);
    throw error;
  }
};


export const submitReview = async (
  companyId: number,
  review: { name: string; text: string; rating: number; avatar?: string }
): Promise<Review> => {
  try {
    const response = await axios.post<Review>(`${API_BASE_URL}/api/Company/${companyId}/reviews`, review);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};
