import { useEffect, useState } from 'react';
import { getEvents } from '../../services/eventService';

export const useEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getEvents()
      .then((data) => {
        setEvents(data);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { events, loading, error };
};
