
import { apiService } from "./apiService";

export interface Approval {
  id: string;
  title: string;
  type: string;
  details: string;
  requestedBy: string;
  requestedOn: string;
  status: string;
  relatedId?: string;
  relatedType?: "member" | "event" | "budget" | "report";
}

export const approvalService = {
  getApprovals: (filters?: Record<string, any>) => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : "";
    return apiService.get(`/approvals${queryParams}`);
  },
  
  getApprovalById: (id: string) => apiService.get(`/approvals/${id}`),
  
  createApproval: (approval: Omit<Approval, "id">) => apiService.post("/approvals", approval),
  
  approveRequest: (id: string, notes?: string) => 
    apiService.post(`/approvals/${id}/approve`, { notes }),
  
  rejectRequest: (id: string, reason: string) => 
    apiService.post(`/approvals/${id}/reject`, { reason }),
    
  generateReport: (report: { title: string, type: string, content: any }) => 
    apiService.post("/reports/generate", report),
};
