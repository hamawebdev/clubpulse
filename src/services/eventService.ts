
import { apiService } from "./apiService";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: string;
  attendees: number;
  maxAttendees?: number;
  organizer?: string;
  budget?: number;
}

export const eventService = {
  getEvents: (filters?: Record<string, any>) => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : "";
    return apiService.get(`/events${queryParams}`);
  },
  
  getEventById: (id: string) => apiService.get(`/events/${id}`),
  
  createEvent: (event: Omit<Event, "id">) => apiService.post("/events", event),
  
  updateEvent: (id: string, event: Partial<Event>) => apiService.put(`/events/${id}`, event),
  
  deleteEvent: (id: string) => apiService.delete(`/events/${id}`),
  
  rsvpToEvent: (eventId: string, userId: string, status: "attending" | "not-attending" | "maybe") => 
    apiService.post(`/events/${eventId}/rsvp`, { userId, status }),
    
  getAttendees: (eventId: string) => apiService.get(`/events/${eventId}/attendees`),
};
