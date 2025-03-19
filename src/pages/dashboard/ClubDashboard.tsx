
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  CheckCircle, 
  UserPlus, 
  CalendarPlus, 
  FileText, 
  Search, 
  Plus, 
  Filter, 
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import MetricCard from '@/components/dashboard/MetricCard';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
import MemberList from '@/components/dashboard/MemberList';
import { useApi } from '@/hooks/useApi';
import { analyticsService } from '@/services/analyticsService';
import { 
  generateChartData, 
  generateMemberData, 
  generateEventData, 
  generateReportData 
} from '@/lib/mock-data';

const ClubDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const tabParam = searchParams.get('tab');
  
  // Initialize API hooks
  const { useGet } = useApi();
  
  // Fetch dashboard analytics data
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useGet(
    ['analytics', 'dashboard'],
    analyticsService.getDashboardAnalytics,
    {
      enabled: tabParam === 'overview' || !tabParam,
      // Use mock data if API fails
      onError: () => {
        console.log('Using mock analytics data');
      }
    }
  );
  
  // Mock data (would be replaced by API data in production)
  const overviewData = generateChartData();
  const eventData = generateEventData(10);
  const reportData = generateReportData(8);
  
  // Set active tab based on URL param or default to 'overview'
  const activeTab = tabParam || 'overview';
  
  const handleTabChange = (value: string) => {
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };
  
  // Load initial notifications
  useEffect(() => {
    // Example of creating a notification when dashboard loads
    toast({
      title: "Welcome to ClubPulse",
      description: "Your dashboard is ready",
    });
  }, [toast]);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings" className="hidden md:block">Settings</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Total Members" 
              value="145" 
              icon={<Users className="h-4 w-4" />} 
              trend={{ value: 12.5, isPositive: true }}
              description="From last month"
            />
            <MetricCard 
              title="Active Events" 
              value="12" 
              icon={<Calendar className="h-4 w-4" />} 
              trend={{ value: 4.2, isPositive: true }}
              description="From last month"
            />
            <MetricCard 
              title="Average Attendance" 
              value="85%" 
              icon={<CheckCircle className="h-4 w-4" />} 
              trend={{ value: 2.1, isPositive: true }}
              description="From previous events"
            />
            <MetricCard 
              title="Pending Approvals" 
              value="5" 
              icon={<FileText className="h-4 w-4" />} 
              trend={{ value: 1.5, isPositive: false }}
              description="Needs your attention"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartWidget 
              title="Club Activity"
              data={overviewData}
              type="line"
              dataKeys={['members', 'events', 'attendance']}
              className="lg:col-span-2"
              config={{
                members: { 
                  label: 'Members', 
                  theme: { light: '#3b82f6', dark: '#60a5fa' } 
                },
                events: { 
                  label: 'Events', 
                  theme: { light: '#10b981', dark: '#34d399' } 
                },
                attendance: { 
                  label: 'Attendance', 
                  theme: { light: '#f59e0b', dark: '#fbbf24' } 
                }
              }}
              actions={
                <Button variant="ghost" size="sm" onClick={() => {
                  toast({
                    title: "Report Downloaded",
                    description: "Club activity report has been downloaded"
                  });
                }}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              }
            />
            
            <DashboardWidget title="Quick Actions">
              <div className="p-4 space-y-3">
                <Button className="w-full justify-start" onClick={() => {
                  searchParams.set('tab', 'members');
                  setSearchParams(searchParams);
                }}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Member
                </Button>
                <Button className="w-full justify-start" onClick={() => {
                  searchParams.set('tab', 'events');
                  setSearchParams(searchParams);
                }}>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
                <Button className="w-full justify-start" onClick={() => {
                  searchParams.set('tab', 'reports');
                  setSearchParams(searchParams);
                }}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" onClick={() => {
                  toast({
                    title: "View Analytics",
                    description: "Analytics dashboard opened"
                  });
                }}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </DashboardWidget>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardWidget 
              title="Upcoming Events" 
              actions={
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    searchParams.set('tab', 'events');
                    setSearchParams(searchParams);
                  }}
                >
                  View All
                </Button>
              }
            >
              <div className="p-4">
                <div className="divide-y">
                  {eventData.slice(0, 3).map((event) => (
                    <div key={event.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.date} • {event.time}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Event Details",
                            description: `Viewing details for ${event.title}`
                          });
                        }}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget 
              title="Recent Reports" 
              actions={
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    searchParams.set('tab', 'reports');
                    setSearchParams(searchParams);
                  }}
                >
                  View All
                </Button>
              }
            >
              <div className="p-4">
                <div className="divide-y">
                  {reportData.slice(0, 3).map((report) => (
                    <div key={report.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.submittedBy} • {report.submittedOn}
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'Approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : report.status === 'Rejected'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {report.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardWidget>
          </div>
        </TabsContent>
        
        {/* Members Tab */}
        <TabsContent value="members">
          <MemberList />
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          {/* Event listing functionality will be implemented here */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search events..."
                className="w-full pl-8 border border-gray-300 dark:border-gray-700 rounded-md py-2"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Create Event",
                  description: "Event form opened"
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Event Calendar</h2>
              <p className="text-muted-foreground">
                The event calendar is loading. In a real application, a full calendar component would be integrated here.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          {/* Reports functionality will be implemented here */}
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
              <Button onClick={() => {
                toast({
                  title: "Generate Report",
                  description: "Report form opened"
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Reports</h2>
              <p className="text-muted-foreground">
                Reports functionality is under development. This would display submitted reports with filtering, sorting, and export options.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Settings form would go here */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-4">Club Settings</h2>
            <p className="text-muted-foreground mb-6">
              Configure your club settings, preferences, and permissions.
            </p>
            <div className="space-y-4">
              <Button onClick={() => {
                toast({
                  title: "Settings Saved",
                  description: "Your settings have been updated successfully"
                });
              }}>
                Save Settings
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClubDashboard;
