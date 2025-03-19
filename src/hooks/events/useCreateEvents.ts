import { useState } from 'react';
import { createEvent, CreateEventPayload } from '../../services/eventService';

export const useCreateEvent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [newEvent, setNewEvent] = useState<any | null>(null);

  const create = async (payload: CreateEventPayload) => {
    setLoading(true);
    try {
      const data = await createEvent(payload);
      setNewEvent(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error, newEvent };
};
