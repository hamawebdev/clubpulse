
import { apiService } from "./apiService";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  avatar: string;
  phone?: string;
  department?: string;
}

export const memberService = {
  getMembers: (filters?: Record<string, any>) => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : "";
    return apiService.get(`/members${queryParams}`);
  },
  
  getMemberById: (id: string) => apiService.get(`/members/${id}`),
  
  createMember: (member: Omit<Member, "id">) => apiService.post("/members", member),
  
  updateMember: (id: string, member: Partial<Member>) => apiService.put(`/members/${id}`, member),
  
  deleteMember: (id: string) => apiService.delete(`/members/${id}`),
  
  searchMembers: (query: string) => apiService.get(`/members/search?q=${encodeURIComponent(query)}`),
};
