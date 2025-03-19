import React, { useState } from 'react';
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
  Download,
  Edit,
  Trash,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import MetricCard from '@/components/dashboard/MetricCard';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
import { 
  generateChartData, 
  generateMemberData, 
  generateEventData, 
  generateReportData 
} from '@/lib/mock-data';
import AddMemberForm from '@/components/forms/AddMemberForm';
import CreateEventForm from '@/components/forms/CreateEventForm';

const ClubDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const tabParam = searchParams.get('tab');
  
  const overviewData = generateChartData();
  const memberData = generateMemberData(15);
  const eventData = generateEventData(10);
  const reportData = generateReportData(8);
  
  const [isAddMemberFormOpen, setIsAddMemberFormOpen] = useState(false);
  const [isCreateEventFormOpen, setIsCreateEventFormOpen] = useState(false);
  
  const activeTab = tabParam || 'overview';
  
  const handleTabChange = (value: string) => {
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };

  const handleAddMemberSubmit = (data) => {
    toast({
      title: "Member Added",
      description: `${data.name} has been successfully added!`,
    });
    setIsAddMemberFormOpen(false);
  };

  const handleAddMemberCancel = () => {
    setIsAddMemberFormOpen(false);
  };

  const handleCreateEventSubmit = (data) => {
    toast({
      title: "Event Created",
      description: `${data.title} has been successfully created!`,
    });
    setIsCreateEventFormOpen(false);
  };

  const handleCreateEventCancel = () => {
    setIsCreateEventFormOpen(false);
  };

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
                <Button className="w-full justify-start" onClick={() => setIsAddMemberFormOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Member
                </Button>
                <Button className="w-full justify-start" onClick={() => setIsCreateEventFormOpen(true)}>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
                <Button className="w-full justify-start" onClick={() => {
                  toast({
                    title: "Generate Report",
                    description: "Report generator opened"
                  });
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
                <Button variant="ghost" size="sm">
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
              title="Recent Members" 
              actions={
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              }
            >
              <div className="p-4">
                <div className="divide-y">
                  {memberData.slice(0, 3).map((member) => (
                    <div key={member.id} className="py-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary mr-3 flex-shrink-0 overflow-hidden">
                        <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.role} • Joined {member.joinDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardWidget>
          </div>
        </TabsContent>
        
        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search members..."
                className="w-full pl-8"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Filter Members",
                  description: "Filter options opened"
                });
              }}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => setIsAddMemberFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {memberData.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.status === 'Active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : member.status === 'Inactive'
                                ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {member.status}
                          </div>
                        </TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "Edit Member",
                                description: `Editing ${member.name}`
                              });
                            }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "Delete Member",
                                description: `Are you sure you want to delete ${member.name}?`
                              });
                            }}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {isAddMemberFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
                <AddMemberForm 
                  onSubmit={handleAddMemberSubmit} 
                  onCancel={handleAddMemberCancel} 
                />
              </div>
            </div>
          )}
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
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Filter Events",
                  description: "Filter options opened"
                });
              }}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => setIsCreateEventFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventData.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs text-muted-foreground">{event.location}</div>
                        </TableCell>
                        <TableCell>{event.type}</TableCell>
                        <TableCell>
                          <div>{event.date}</div>
                          <div className="text-xs text-muted-foreground">{event.time}</div>
                        </TableCell>
                        <TableCell>{event.attendees}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.status === 'Upcoming' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                              : event.status === 'Ongoing'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : event.status === 'Completed'
                                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {event.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "Edit Event",
                                description: `Editing ${event.title}`
                              });
                            }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "Delete Event",
                                description: `Are you sure you want to delete ${event.title}?`
                              });
                            }}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {isCreateEventFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
                <CreateEventForm 
                  onSubmit={handleCreateEventSubmit}
                  onCancel={handleCreateEventCancel}
                />
              </div>
            </div>
          )}
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
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Filter Reports",
                  description: "Filter options opened"
                });
              }}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Generate New Report",
                  description: "Report form opened"
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-muted-foreground">#{report.id}</div>
                        </TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.submittedBy}</TableCell>
                        <TableCell>{report.submittedOn}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'Approved' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : report.status === 'Rejected'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                : report.status === 'Draft'
                                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {report.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "View Report",
                                description: `Viewing ${report.title}`
                              });
                            }}>
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "Download Report",
                                description: `Downloading ${report.title}`
                              });
                            }}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "More Options",
                                description: "Options menu opened"
                              });
                            }}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Club Settings</h3>
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClubDashboard;