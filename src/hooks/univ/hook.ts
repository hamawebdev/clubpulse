// administrationService.ts
import axios from '../../lib/axios';

// Interface for create university administration payload
export interface CreateAdministrationPayload {
  university_id: number;
  name: string;
  email: string;
  phone: string;
}

/**
 * Fetches all university administrations
 * @returns Promise with the API response
 */
export const getUnivs = async (): Promise<any> => {
  try {
    const response = await axios.get('/administrations');
    return response;
  } catch (error) {
    console.error('Error fetching administrations:', error);
    throw error;
  }
};

/**
 * Creates a new university administration record
 * @param data The university administration data
 * @returns Promise with the API response
 */
export const createUniversity = async (data: CreateAdministrationPayload): Promise<any> => {
  try {
    const response = await axios.post('/administrations', data, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating administration:', error);
    throw error;
  }
};