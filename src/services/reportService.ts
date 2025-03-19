
import { apiService } from "./apiService";

export interface Report {
  id: string;
  title: string;
  type: string;
  submittedBy: string;
  submittedOn: string;
  status: string;
  content: Record<string, any>;
  attachments?: string[];
}

export const reportService = {
  getReports: (filters?: Record<string, any>) => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : "";
    return apiService.get(`/reports${queryParams}`);
  },
  
  getReportById: (id: string) => apiService.get(`/reports/${id}`),
  
  createReport: (report: Omit<Report, "id">) => apiService.post("/reports", report),
  
  updateReport: (id: string, report: Partial<Report>) => apiService.put(`/reports/${id}`, report),
  
  deleteReport: (id: string) => apiService.delete(`/reports/${id}`),
  
  approveReport: (id: string) => apiService.post(`/reports/${id}/approve`, {}),
  
  rejectReport: (id: string, reason: string) => apiService.post(`/reports/${id}/reject`, { reason }),
  
  exportReport: (id: string, format: "csv" | "pdf") => 
    apiService.get(`/reports/${id}/export?format=${format}`),
};
