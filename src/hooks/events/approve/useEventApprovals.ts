// hooks/useEventApprovals.ts
import { useState } from 'react';
import { getEventApprovals } from '../../../services/eventApproval';

export const useEventApprovals = () => {
  const [eventApprovals, setEventApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all event approvals
   * @returns The fetched event approvals or null if there was an error
   */
  const fetchEventApprovals = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getEventApprovals();
      setEventApprovals(response.data);
      return response.data;
    } catch (err) {
      setError("Failed to fetch event approvals");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    eventApprovals,
    loading,
    error,
    fetchEventApprovals
  };
};