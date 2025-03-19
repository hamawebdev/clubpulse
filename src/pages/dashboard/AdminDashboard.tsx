
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
  Check, 
  X, 
  Eye, 
  Clock, 
  ThumbsUp, 
  ThumbsDown,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import MetricCard from '@/components/dashboard/MetricCard';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import ChartWidget from '@/components/dashboard/ChartWidget';
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
  
  const overviewData = generateChartData();
  const approvalData = generateApprovalData(8);
  const reportData = generateReportData(10);
  const analyticsData = generateAnalyticsData();
  const attendanceData = generateAttendanceData();
  const memberGrowthData = generateMemberGrowthData();
  
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
              value={analyticsData.memberStats.active} 
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
              value={analyticsData.eventStats.upcoming} 
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
                        toast({
                          title: "View Details",
                          description: `Viewing ${approval.title}`
                        });
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
                  <ArrowRight className="h-4 w-4 ml-1" />
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
        <TabsContent value="approvals" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search approvals..."
                className="w-full pl-8"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Filter Approvals",
                  description: "Filter options opened"
                });
              }}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalData.map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell>
                          <div className="font-medium">{approval.title}</div>
                          <div className="text-xs text-muted-foreground">{approval.details.substring(0, 40)}...</div>
                        </TableCell>
                        <TableCell>{approval.type}</TableCell>
                        <TableCell>{approval.requestedBy}</TableCell>
                        <TableCell>{approval.requestedOn}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            Pending
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="text-green-600 gap-1" onClick={() => {
                              toast({
                                title: "Request Approved",
                                description: `${approval.title} has been approved`
                              });
                            }}>
                              <Check className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 gap-1" onClick={() => {
                              toast({
                                title: "Request Rejected",
                                description: `${approval.title} has been rejected`
                              });
                            }}>
                              <X className="h-4 w-4" />
                              Reject
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => {
                              toast({
                                title: "View Details",
                                description: `Viewing details for ${approval.title}`
                              });
                            }}>
                              <Eye className="h-4 w-4" />
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
                  title: "Generate Report",
                  description: "Report generator opened"
                });
              }}>
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report</TableHead>
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
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Report Downloaded",
                                description: `${report.title} has been downloaded`
                              });
                            }}>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "View Report",
                                description: `Viewing ${report.title}`
                              });
                            }}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            {report.status === 'Submitted' && (
                              <>
                                <Button variant="ghost" size="icon" className="text-green-600" onClick={() => {
                                  toast({
                                    title: "Report Approved",
                                    description: `${report.title} has been approved`
                                  });
                                }}>
                                  <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-600" onClick={() => {
                                  toast({
                                    title: "Report Rejected",
                                    description: `${report.title} has been rejected`
                                  });
                                }}>
                                  <ThumbsDown className="h-4 w-4" />
                                </Button>
                              </>
                            )}
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
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Member Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Members</span>
                  <span className="font-medium">{analyticsData.memberStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Members</span>
                  <span className="font-medium">{analyticsData.memberStats.active}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Inactive Members</span>
                  <span className="font-medium">{analyticsData.memberStats.inactive}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">New This Month</span>
                  <span className="font-medium">{analyticsData.memberStats.newThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Growth Rate</span>
                  <span className="font-medium text-green-600">+{analyticsData.memberStats.growthRate}%</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Event Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Events</span>
                  <span className="font-medium">{analyticsData.eventStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Upcoming Events</span>
                  <span className="font-medium">{analyticsData.eventStats.upcoming}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completed Events</span>
                  <span className="font-medium">{analyticsData.eventStats.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cancelled Events</span>
                  <span className="font-medium">{analyticsData.eventStats.cancelled}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg. Attendance</span>
                  <span className="font-medium">{analyticsData.eventStats.averageAttendance}</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Financial Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-medium">${analyticsData.financialStats.totalBudget}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget Spent</span>
                  <span className="font-medium">${analyticsData.financialStats.spent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget Remaining</span>
                  <span className="font-medium">${analyticsData.financialStats.remaining}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg. Event Cost</span>
                  <span className="font-medium">${analyticsData.financialStats.averageEventCost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget Utilization</span>
                  <span className="font-medium">{Math.round((analyticsData.financialStats.spent / analyticsData.financialStats.totalBudget) * 100)}%</span>
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
          
          <Card className="p-6">
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
          <Card className="p-6">
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
