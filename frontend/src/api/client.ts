import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5050/api',
});

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

export interface Note {
  id: number;
  leadId: number;
  content: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
}
