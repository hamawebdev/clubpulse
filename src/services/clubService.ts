// clubService.ts
import axiosInstance from '../lib/axios';

export interface CreateClubPayload {
  name: string;
  university_id: number;
}

export const createClub = async (
  payload: CreateClubPayload
): Promise<any> => {
  try {
    const response = await axiosInstance.post('/clubs', payload, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating club:', error);
    throw error;
  }
};

// Example usage:
// const newClub: CreateClubPayload = { name: 'Club Name', university_id: 1 };
// createClub(newClub)
//   .then(data => console.log('Club created:', data))
//   .catch(error => console.error('Creation failed:', error));
