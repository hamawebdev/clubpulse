// hooks/useClubs.ts
import { useState } from 'react';
import { getClubs } from '../../services/clubService';

export const useClubs = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClubs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getClubs();
      setClubs(response.data);
      return response.data;
    } catch (err) {
      setError("Failed to fetch clubs");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    clubs,
    loading,
    error,
    fetchClubs
  };
};