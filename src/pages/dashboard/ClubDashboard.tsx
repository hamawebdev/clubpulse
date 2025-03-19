
import React, { useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import MetricCard from '@/components/dashboard/MetricCard';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
import MemberList from '@/components/dashboard/MemberList';
import MemberForm from '@/components/dashboard/MemberForm';
import EventForm from '@/components/dashboard/EventForm';
import ReportForm from '@/components/dashboard/ReportForm';
import { useApi } from '@/hooks/useApi';
import { analyticsService } from '@/services/analyticsService';
import { eventService, Event } from '@/services/eventService';
import { reportService, Report } from '@/services/reportService';
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
  
  // State for forms
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  
  // State for search and filters
  const [eventSearch, setEventSearch] = useState('');
  const [eventFilters, setEventFilters] = useState({
    type: [] as string[],
    status: [] as string[]
  });
  
  const [reportSearch, setReportSearch] = useState('');
  const [reportFilters, setReportFilters] = useState({
    type: [] as string[],
    status: [] as string[]
  });
  
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
  
  // Fetch events data
  const { data: events = [], isLoading: isLoadingEvents } = useGet(
    ['events'],
    () => eventService.getEvents(),
    {
      enabled: tabParam === 'events',
      onError: () => {
        console.log('Using mock events data');
      }
    }
  );
  
  // Fetch reports data
  const { data: reports = [], isLoading: isLoadingReports } = useGet(
    ['reports'],
    () => reportService.getReports(),
    {
      enabled: tabParam === 'reports',
      onError: () => {
        console.log('Using mock reports data');
      }
    }
  );
  
  // Mock data (would be replaced by API data in production)
  const overviewData = generateChartData();
  const eventData = events.length > 0 ? events : generateEventData(10);
  const reportData = reports.length > 0 ? reports : generateReportData(8);
  
  // Set active tab based on URL param or default to 'overview'
  const activeTab = tabParam || 'overview';
  
  const handleTabChange = (value: string) => {
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };
  
  // Filter events based on search and selected filters
  const filteredEvents = eventData.filter((event: Event) => {
    // Apply search filter
    if (eventSearch && !event.title.toLowerCase().includes(eventSearch.toLowerCase())) {
      return false;
    }
    
    // Apply type filter if any types are selected
    if (eventFilters.type.length > 0 && !eventFilters.type.includes(event.type)) {
      return false;
    }
    
    // Apply status filter if any statuses are selected
    if (eventFilters.status.length > 0 && !eventFilters.status.includes(event.status)) {
      return false;
    }
    
    return true;
  });
  
  // Filter reports based on search and selected filters
  const filteredReports = reportData.filter((report: Report) => {
    // Apply search filter
    if (reportSearch && !report.title.toLowerCase().includes(reportSearch.toLowerCase())) {
      return false;
    }
    
    // Apply type filter if any types are selected
    if (reportFilters.type.length > 0 && !reportFilters.type.includes(report.type)) {
      return false;
    }
    
    // Apply status filter if any statuses are selected
    if (reportFilters.status.length > 0 && !reportFilters.status.includes(report.status)) {
      return false;
    }
    
    return true;
  });
  
  // Toggle event filter
  const toggleEventFilter = (type: 'type' | 'status', value: string) => {
    setEventFilters(prev => {
      if (prev[type].includes(value)) {
        return {
          ...prev,
          [type]: prev[type].filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...prev[type], value]
        };
      }
    });
  };
  
  // Toggle report filter
  const toggleReportFilter = (type: 'type' | 'status', value: string) => {
    setReportFilters(prev => {
      if (prev[type].includes(value)) {
        return {
          ...prev,
          [type]: prev[type].filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...prev[type], value]
        };
      }
    });
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
                <Button className="w-full justify-start" onClick={() => setIsMemberFormOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Member
                </Button>
                <Button className="w-full justify-start" onClick={() => setIsEventFormOpen(true)}>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
                <Button className="w-full justify-start" onClick={() => setIsReportFormOpen(true)}>
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
                  {eventData.slice(0, 3).map((event: Event) => (
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
                  {reportData.slice(0, 3).map((report: Report) => (
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="w-full pl-8"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Events</h4>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Event Type</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {['Meeting', 'Workshop', 'Social', 'Conference', 'Other'].map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`} 
                              checked={eventFilters.type.includes(type)}
                              onCheckedChange={() => toggleEventFilter('type', type)}
                            />
                            <Label htmlFor={`type-${type}`}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Status</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {['Upcoming', 'Active', 'Completed', 'Cancelled'].map(status => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`status-${status}`} 
                              checked={eventFilters.status.includes(status)}
                              onCheckedChange={() => toggleEventFilter('status', status)}
                            />
                            <Label htmlFor={`status-${status}`}>{status}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEventFilters({ type: [], status: [] })}
                      >
                        Reset
                      </Button>
                      <Button size="sm">Apply Filters</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button onClick={() => setIsEventFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6">
              {isLoadingEvents ? (
                <div className="text-center py-10">Loading events...</div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-10">No events found matching your filters.</div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event: Event) => (
                    <div key={event.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.date} • {event.time} • {event.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              event.status === 'Upcoming' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                                : event.status === 'Active'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : event.status === 'Completed'
                                    ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {event.status}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {event.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{event.description.substring(0, 150)}...</p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{event.attendees} Attendees</span>
                          {event.maxAttendees && (
                            <span>/ {event.maxAttendees} Max</span>
                          )}
                        </div>
                        <Button size="sm">RSVP</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="w-full pl-8"
                value={reportSearch}
                onChange={(e) => setReportSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Reports</h4>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Report Type</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {['Attendance', 'Financial', 'Event Summary', 'Membership', 'Custom'].map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`report-type-${type}`} 
                              checked={reportFilters.type.includes(type)}
                              onCheckedChange={() => toggleReportFilter('type', type)}
                            />
                            <Label htmlFor={`report-type-${type}`}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Status</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {['Approved', 'Pending', 'Rejected'].map(status => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`report-status-${status}`} 
                              checked={reportFilters.status.includes(status)}
                              onCheckedChange={() => toggleReportFilter('status', status)}
                            />
                            <Label htmlFor={`report-status-${status}`}>{status}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setReportFilters({ type: [], status: [] })}
                      >
                        Reset
                      </Button>
                      <Button size="sm">Apply Filters</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        toast({
                          title: "Exporting Reports",
                          description: "Reports are being exported as CSV"
                        });
                      }}
                    >
                      Export as CSV
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        toast({
                          title: "Exporting Reports",
                          description: "Reports are being exported as PDF"
                        });
                      }}
                    >
                      Export as PDF
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button onClick={() => setIsReportFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6">
              {isLoadingReports ? (
                <div className="text-center py-10">Loading reports...</div>
              ) : filteredReports.length === 0 ? (
                <div className="text-center py-10">No reports found matching your filters.</div>
              ) : (
                <div className="space-y-4">
                  {filteredReports.map((report: Report) => (
                    <div key={report.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-medium">{report.title}</h3>
                          <p className="text-sm text-muted-foreground">Submitted by {report.submittedBy} on {report.submittedOn}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              report.status === 'Approved' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : report.status === 'Rejected'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                              {report.status}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {report.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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
      
      {/* Forms */}
      <MemberForm isOpen={isMemberFormOpen} onClose={() => setIsMemberFormOpen(false)} />
      <EventForm isOpen={isEventFormOpen} onClose={() => setIsEventFormOpen(false)} />
      <ReportForm isOpen={isReportFormOpen} onClose={() => setIsReportFormOpen(false)} />
    </div>
  );
};

export default ClubDashboard;
