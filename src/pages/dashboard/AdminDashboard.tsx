
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Search, 
  Filter, 
  Download, 
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import MetricCard from '@/components/dashboard/MetricCard';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
import ApprovalList from '@/components/dashboard/ApprovalList';
import { useApi } from '@/hooks/useApi';
import { analyticsService } from '@/services/analyticsService';
import { 
  generateChartData, 
  generateApprovalData, 
  generateReportData, 
  generateAnalyticsData,
  generateAttendanceData,
  generateMemberGrowthData
} from '@/lib/mock-data';

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const tabParam = searchParams.get('tab');
  
  // Initialize API hooks
  const { useGet } = useApi();
  
  // Fetch analytics data
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useGet(
    ['admin', 'analytics'],
    analyticsService.getDashboardAnalytics,
    {
      enabled: tabParam === 'overview' || !tabParam || tabParam === 'analytics',
      // Use mock data if API fails
      onError: () => {
        console.log('Using mock analytics data');
      }
    }
  );
  
  // Mock data (would be replaced by API data in production)
  const mockAnalyticsData = generateAnalyticsData();
  const overviewData = generateChartData();
  const approvalData = generateApprovalData(8);
  const reportData = generateReportData(10);
  const attendanceData = generateAttendanceData();
  const memberGrowthData = generateMemberGrowthData();
  
  // Use real data or fall back to mock data
  const displayedAnalytics = analyticsData || mockAnalyticsData;
  
  // Set active tab based on URL param or default to 'overview'
  const activeTab = tabParam || 'overview';
  
  const handleTabChange = (value: string) => {
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings" className="hidden md:block">Settings</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Total Clubs" 
              value="24" 
              icon={<Users className="h-4 w-4" />} 
              trend={{ value: 8.3, isPositive: true }}
              description="From last month"
            />
            <MetricCard 
              title="Active Members" 
              value={displayedAnalytics.memberStats.active} 
              icon={<Users className="h-4 w-4" />} 
              trend={{ value: 5.2, isPositive: true }}
              description="Across all clubs"
            />
            <MetricCard 
              title="Pending Approvals" 
              value={approvalData.length} 
              icon={<Clock className="h-4 w-4" />} 
              trend={{ value: 2.7, isPositive: false }}
              description="Waiting for review"
            />
            <MetricCard 
              title="Monthly Events" 
              value={displayedAnalytics.eventStats.upcoming} 
              icon={<Calendar className="h-4 w-4" />} 
              trend={{ value: 12.5, isPositive: true }}
              description="Scheduled this month"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartWidget 
              title="Platform Overview"
              data={overviewData}
              type="area"
              dataKeys={['members', 'events', 'attendance']}
              className="lg:col-span-2"
              config={{
                members: { 
                  label: 'Active Members', 
                  theme: { light: '#3b82f6', dark: '#60a5fa' } 
                },
                events: { 
                  label: 'Events', 
                  theme: { light: '#10b981', dark: '#34d399' } 
                },
                attendance: { 
                  label: 'Avg. Attendance', 
                  theme: { light: '#f59e0b', dark: '#fbbf24' } 
                }
              }}
              actions={
                <Button variant="ghost" size="sm" onClick={() => {
                  toast({
                    title: "Report Generated",
                    description: "Platform overview report has been generated"
                  });
                }}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              }
            />
            
            <DashboardWidget title="Recent Activity">
              <div className="p-4 space-y-4">
                <div className="space-y-4">
                  {approvalData.slice(0, 3).map((approval, index) => (
                    <div key={approval.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        index % 3 === 0 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                          : index % 3 === 1 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {index % 3 === 0 
                          ? <Users className="h-4 w-4" /> 
                          : index % 3 === 1 
                            ? <Calendar className="h-4 w-4" />
                            : <FileText className="h-4 w-4" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{approval.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {approval.requestedBy} • {approval.requestedOn}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0" onClick={() => {
                        searchParams.set('tab', 'approvals');
                        setSearchParams(searchParams);
                      }}>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  className="w-full text-primary" 
                  onClick={() => {
                    searchParams.set('tab', 'approvals');
                    setSearchParams(searchParams);
                  }}
                >
                  View All Activities
                </Button>
              </div>
            </DashboardWidget>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWidget 
              title="Event Attendance"
              data={attendanceData}
              type="bar"
              dataKeys={['attendance', 'expected']}
              config={{
                attendance: { 
                  label: 'Actual', 
                  theme: { light: '#3b82f6', dark: '#60a5fa' } 
                },
                expected: { 
                  label: 'Expected', 
                  theme: { light: '#9ca3af', dark: '#d1d5db' } 
                }
              }}
            />
            
            <ChartWidget 
              title="Member Growth"
              data={memberGrowthData}
              type="line"
              dataKeys={['members']}
              config={{
                members: { 
                  label: 'Members', 
                  theme: { light: '#10b981', dark: '#34d399' } 
                }
              }}
            />
          </div>
        </TabsContent>
        
        {/* Approvals Tab */}
        <TabsContent value="approvals">
          <ApprovalList />
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search reports..."
                className="w-full pl-8 border border-gray-300 dark:border-gray-700 rounded-md py-2"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Reports</h2>
              <p className="text-muted-foreground">
                Reports module is under development. This would display all submitted reports with filtering, sorting, and export options.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Member Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Members</span>
                  <span className="font-medium">{displayedAnalytics.memberStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Members</span>
                  <span className="font-medium">{displayedAnalytics.memberStats.active}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Inactive Members</span>
                  <span className="font-medium">{displayedAnalytics.memberStats.inactive}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">New This Month</span>
                  <span className="font-medium">{displayedAnalytics.memberStats.newThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Growth Rate</span>
                  <span className="font-medium text-green-600">+{displayedAnalytics.memberStats.growthRate}%</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Event Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Events</span>
                  <span className="font-medium">{displayedAnalytics.eventStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Upcoming Events</span>
                  <span className="font-medium">{displayedAnalytics.eventStats.upcoming}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completed Events</span>
                  <span className="font-medium">{displayedAnalytics.eventStats.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cancelled Events</span>
                  <span className="font-medium">{displayedAnalytics.eventStats.cancelled}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg. Attendance</span>
                  <span className="font-medium">{displayedAnalytics.eventStats.averageAttendance}</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Financial Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-medium">${displayedAnalytics.financialStats.totalBudget}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget Spent</span>
                  <span className="font-medium">${displayedAnalytics.financialStats.spent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget Remaining</span>
                  <span className="font-medium">${displayedAnalytics.financialStats.remaining}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg. Event Cost</span>
                  <span className="font-medium">${displayedAnalytics.financialStats.averageEventCost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget Utilization</span>
                  <span className="font-medium">{Math.round((displayedAnalytics.financialStats.spent / displayedAnalytics.financialStats.totalBudget) * 100)}%</span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWidget 
              title="Member Growth Trend"
              data={memberGrowthData}
              type="area"
              dataKeys={['members']}
              config={{
                members: { 
                  label: 'Members', 
                  theme: { light: '#3b82f6', dark: '#60a5fa' } 
                }
              }}
            />
            
            <ChartWidget 
              title="Member Activity"
              data={memberGrowthData}
              type="bar"
              dataKeys={['growth', 'churn']}
              config={{
                growth: { 
                  label: 'New Members', 
                  theme: { light: '#10b981', dark: '#34d399' } 
                },
                churn: { 
                  label: 'Churned Members', 
                  theme: { light: '#ef4444', dark: '#f87171' } 
                }
              }}
            />
          </div>
          
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Analytics Report</h3>
              <Button onClick={() => {
                toast({
                  title: "Report Generated",
                  description: "Full analytics report has been generated"
                });
              }}>
                <Download className="h-4 w-4 mr-2" />
                Download Full Report
              </Button>
            </div>
            <p className="text-muted-foreground mb-4">
              The platform has shown consistent growth over the past 6 months, with a 15% increase in active users and a 22% increase in event attendance. Club engagement metrics have improved across all measured dimensions.
            </p>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Admin Settings</h3>
            <p className="text-muted-foreground mb-6">
              Configure global settings, permissions, and platform preferences.
            </p>
            <div className="space-y-4">
              <Button onClick={() => {
                toast({
                  title: "Settings Saved",
                  description: "Admin settings have been updated successfully"
                });
              }}>
                Save Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
