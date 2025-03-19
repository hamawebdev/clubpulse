// hooks/useCreateUniversity.ts
import { useState } from 'react';
import { createUniversity, CreateUniversityPayload } from '../../services/univService';

export const useCreateUniversity = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [university, setUniversity] = useState<any | null>(null);

  /**
   * Create a new university administration record
   * @param data University administration data
   * @returns The created university data or null if there was an error
   */
  const addUniversity = async (data: CreateUniversityPayload) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await createUniversity(data);
      setUniversity(response.data);
      return response.data;
    } catch (err) {
      setError("Failed to create university administration");
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset the hook state
   */
  const reset = () => {
    setUniversity(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    error,
    university,
    addUniversity,
    reset
  };
};