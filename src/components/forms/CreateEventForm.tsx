// src/components/forms/CreateEventForm.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateEvents } from '@/hooks/events/useCreateEvents';

interface CreateEventFormProps {
  onSuccess?: () => void;
  onCancel: () => void;
}

export interface EventFormData {
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const CreateEventForm = ({ onSuccess, onCancel }: CreateEventFormProps) => {
  const { create, loading, error } = useCreateEvents();
  const [formData, setFormData] = React.useState<EventFormData>({
    title: '',
    type: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: keyof EventFormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create({
        ...formData,
        dateTime: `${formData.date}T${formData.time}`,
        status: 'upcoming' // Add default status
      });
      
      setFormData({
        title: '',
        type: '',
        date: '',
        time: '',
        location: '',
        description: ''
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter event title"
          required
        />
      </div>

      <div>
        <Label htmlFor="type">Event Type</Label>
        <Select
          value={formData.type}
          onValueChange={handleSelectChange('type')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter event location"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter event description"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};

export default CreateEventForm;