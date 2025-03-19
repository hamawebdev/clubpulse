// eventApprovalService.ts
import axios from '../lib/axios';

// Interface for event approval payload
export interface CreateEventApprovalPayload {
  event_id: string;
  status: 'approved' | 'rejected';
  remarks: string;
}

/**
 * Fetches all event approvals
 * @returns Promise with the API response
 */
export const getEventApprovals = async (): Promise<any> => {
  try {
    const response = await axios.get('/event-approvals', {
      headers: {
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching event approvals:', error);
    throw error;
  }
};

/**
 * Creates a new event approval
 * @param data The event approval data
 * @returns Promise with the API response
 */
export const createEventApproval = async (data: CreateEventApprovalPayload): Promise<any> => {
  try {
    const response = await axios.post('/event-approvals', data, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating event approval:', error);
    throw error;
  }
};