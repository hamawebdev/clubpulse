// hooks/useCreateClub.ts
import { useState } from 'react';
import { createClub, CreateClubPayload } from '../../services/clubService';

export const useCreateClub = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newClub, setNewClub] = useState<any | null>(null);

  const addClub = async (clubData: CreateClubPayload) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await createClub(clubData);
      setNewClub(response.data);
      return response.data;
    } catch (err) {
      setError("Failed to create club");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    newClub,
    addClub
  };
};