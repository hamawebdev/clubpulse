
import { apiService } from "./apiService";

export interface AnalyticsData {
  memberStats: {
    total: number;
    active: number;
    inactive: number;
    newThisMonth: number;
    growthRate: number;
  };
  eventStats: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
    averageAttendance: number;
  };
  financialStats: {
    totalBudget: number;
    spent: number;
    remaining: number;
    averageEventCost: number;
  };
}

export const analyticsService = {
  getDashboardAnalytics: () => apiService.get("/analytics/dashboard"),
  
  getMemberGrowth: (period: "week" | "month" | "year" = "month") => 
    apiService.get(`/analytics/members/growth?period=${period}`),
  
  getEventAttendance: (period: "week" | "month" | "year" = "month") => 
    apiService.get(`/analytics/events/attendance?period=${period}`),
  
  getFinancialMetrics: (period: "week" | "month" | "year" = "month") => 
    apiService.get(`/analytics/financial?period=${period}`),
    
  getCustomReport: (metrics: string[], filters: Record<string, any>) => {
    const queryParams = new URLSearchParams();
    metrics.forEach(metric => queryParams.append("metrics", metric));
    Object.entries(filters).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
    return apiService.get(`/analytics/custom?${queryParams.toString()}`);
  }
};
