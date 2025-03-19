
import { toast } from "@/hooks/use-toast";

const API_URL = "https://api.clubpulse.example"; // Replace with actual API URL in production

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  return response.json();
};

// Generic request function
const request = async (endpoint: string, options?: RequestInit) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        // Add auth headers here when authentication is implemented
      },
      ...options,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("API request failed:", error);
    toast({
      title: "Request Failed",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive",
    });
    throw error;
  }
};

export const apiService = {
  get: (endpoint: string) => request(endpoint),
  post: (endpoint: string, data: any) => 
    request(endpoint, { method: "POST", body: JSON.stringify(data) }),
  put: (endpoint: string, data: any) => 
    request(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: (endpoint: string) => 
    request(endpoint, { method: "DELETE" }),
};
