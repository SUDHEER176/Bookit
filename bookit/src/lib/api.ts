import axios from 'axios';
import { Experience, BookingDetails } from '@/types/experience';

// Use relative paths in development (via Vite proxy), or absolute URL in production
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:5000');

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExperiences = async (): Promise<Experience[]> => {
  const response = await api.get('/api/experiences');
  return response.data.data ?? response.data; // support both shapes
};

export const getExperienceById = async (id: string): Promise<{ experience: Experience; availableSlots: any[] }> => {
  const response = await api.get(`/api/experiences/${id}`);
  return response.data.data ?? response.data;
};

export const createBooking = async (payload: any) => {
  const response = await api.post('/api/bookings', payload);
  return response.data;
};

export const validatePromoCode = async (code: string) => {
  // If backend implements promo validate later; for now local
  const response = await api.post('/promo/validate', { code });
  return response.data;
};

export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'Unable to connect to server';
  } else {
    // Something else went wrong
    return 'An error occurred';
  }
};