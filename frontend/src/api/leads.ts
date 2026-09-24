import { api, type Lead, type Note, type PaginatedResponse } from './client';

export const getLeads = async (search?: string, status?: string) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (status) params.append('status', status);
  
  const response = await api.get<PaginatedResponse<Lead>>(`/leads?${params.toString()}`);
  return response.data;
};

export const getLead = async (id: number) => {
  const response = await api.get<{data: Lead & { notes: Note[] }}>(`/leads/${id}`);
  return response.data;
};

export const createLead = async (data: Partial<Lead>) => {
  const response = await api.post<{data: Lead}>('/leads', data);
  return response.data;
};

export const updateLead = async (id: number, data: Partial<Lead>) => {
  const response = await api.patch<{data: Lead}>(`/leads/${id}`, data);
  return response.data;
};

export const deleteLead = async (id: number) => {
  await api.delete(`/leads/${id}`);
};

export const createNote = async (leadId: number, content: string) => {
  const response = await api.post<{data: Note}>(`/leads/${leadId}/notes`, { content });
  return response.data;
};
