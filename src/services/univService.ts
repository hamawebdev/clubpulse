// universityService.ts
import axios from '../lib/axios';

// Interface for create university payload
export interface CreateUniversityPayload {
  university_id: number;
  name: string;
  email: string;
  phone: string;
}

/**
 * Creates a new university administration record
 * @param data The university administration data
 * @returns Promise with the API response
 */
export const createUniversity = async (data: CreateUniversityPayload): Promise<any> => {
  try {
    const response = await axios.post('/administrations', data, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating university administration:', error);
    throw error;
  }
};