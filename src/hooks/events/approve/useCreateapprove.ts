// hooks/useCreateEventApproval.ts
import { useState } from 'react';
import { createEventApproval, CreateEventApprovalPayload } from '../../../services/eventApproval';

export const useCreateEventApproval = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [eventApproval, setEventApproval] = useState<any | null>(null);

  /**
   * Create a new event approval
   * @param data Event approval data
   * @returns The created event approval data or null if there was an error
   */
  const addEventApproval = async (data: CreateEventApprovalPayload) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await createEventApproval(data);
      setEventApproval(response.data);
      return response.data;
    } catch (err) {
      setError("Failed to create event approval");
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset the hook state
   */
  const reset = () => {
    setEventApproval(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    error,
    eventApproval,
    addEventApproval,
    reset
  };
};