// eventService.ts
import axios from '../lib/axios';

// Function to get events
export const getEvents = async (): Promise<any> => {
  try {
    const response = await axios.get('/events', {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Interface for create event payload
export interface CreateEventPayload {
  title: string;
  event_date: string;
  club_id: string;
  location: string;
}

// Function to create a new event
export const createEvent = async (data: CreateEventPayload): Promise<any> => {
  try {
    const response = await axios.post('/events', data, {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
