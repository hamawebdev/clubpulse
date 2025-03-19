// clubService.ts
import axios from '../lib/axios';

// Function to get clubs
export const getClubs = async (): Promise<any> => {
  try {
    const response = await axios.get('/clubs', {
      headers: { Accept: 'application/json' },
    });
    return response;
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
};

// Interface for create club payload
export interface CreateClubPayload {
  name: string;
  university_id: number;
}

// Function to create a new club
export const createClub = async (data: CreateClubPayload): Promise<any> => {
  try {
    const response = await axios.post('/clubs', data, {
      headers: { Accept: 'application/json' },
    });
    return response;
  } catch (error) {
    console.error('Error creating club:', error);
    throw error;
  }
};
