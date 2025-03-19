
// Mock data for dashboard
import { subDays, format } from 'date-fns';

export const generateChartData = (days = 7) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = subDays(new Date(), days - 1 - i);
    return {
      name: format(date, 'MMM dd'),
      members: Math.floor(Math.random() * 10) + 20,
      events: Math.floor(Math.random() * 5) + 1,
      attendance: Math.floor(Math.random() * 30) + 50,
    };
  });
};

export const generateMemberData = (count = 10) => {
  const roles = ['Member', 'Treasurer', 'Secretary', 'Vice President', 'President'];
  const statuses = ['Active', 'Inactive', 'Pending'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `MEM-${1000 + i}`,
    name: `Member ${i + 1}`,
    email: `member${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    joinDate: format(subDays(new Date(), Math.floor(Math.random() * 365)), 'MMM dd, yyyy'),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    avatar: `https://ui-avatars.com/api/?name=Member+${i + 1}&background=random`,
  }));
};

export const generateEventData = (count = 5) => {
  const types = ['Meeting', 'Workshop', 'Social', 'Competition', 'Fundraiser'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `EVT-${2000 + i}`,
    title: `Event ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    date: format(subDays(new Date(), -Math.floor(Math.random() * 30)), 'MMM dd, yyyy'),
    time: `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
    location: `Location ${i + 1}`,
    attendees: Math.floor(Math.random() * 50) + 10,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

export const generateReportData = (count = 5) => {
  const types = ['Monthly', 'Event', 'Financial', 'Membership', 'Activity'];
  const statuses = ['Submitted', 'Draft', 'Approved', 'Rejected'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `REP-${3000 + i}`,
    title: `Report ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    submittedBy: `Member ${Math.floor(Math.random() * 10) + 1}`,
    submittedOn: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'MMM dd, yyyy'),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

export const generateApprovalData = (count = 5) => {
  const types = ['Member Join', 'Event Proposal', 'Budget Request', 'Report Approval'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `APR-${4000 + i}`,
    title: `Approval Request ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    requestedBy: `Member ${Math.floor(Math.random() * 10) + 1}`,
    requestedOn: format(subDays(new Date(), Math.floor(Math.random() * 10)), 'MMM dd, yyyy'),
    details: `Details for approval request ${i + 1}`,
    status: 'Pending',
  }));
};

export const generateAnalyticsData = () => {
  // Member stats
  const memberStats = {
    total: 145,
    active: 120,
    inactive: 25,
    newThisMonth: 12,
    growthRate: 8.3,
  };
  
  // Event stats
  const eventStats = {
    total: 34,
    upcoming: 5,
    completed: 28,
    cancelled: 1,
    averageAttendance: 42,
  };
  
  // Financial stats
  const financialStats = {
    totalBudget: 15000,
    spent: 8750,
    remaining: 6250,
    averageEventCost: 580,
  };
  
  return {
    memberStats,
    eventStats,
    financialStats,
  };
};

// Analytics
export const generateAttendanceData = () => {
  const events = ['Event A', 'Event B', 'Event C', 'Event D', 'Event E'];
  return events.map(event => ({
    name: event,
    attendance: Math.floor(Math.random() * 50) + 30,
    expected: Math.floor(Math.random() * 20) + 60,
  }));
};

export const generateMemberGrowthData = (months = 6) => {
  const data = [];
  let members = 80;
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - 1 - i));
    
    const growth = Math.floor(Math.random() * 15) - 2;
    members += growth;
    
    data.push({
      name: format(date, 'MMM'),
      members,
      growth: growth > 0 ? growth : 0,
      churn: growth < 0 ? Math.abs(growth) : 0,
    });
  }
  
  return data;
};
