import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Home, 
  CheckSquare, 
  FileText, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import NotificationDropdown from '@/components/dashboard/NotificationDropdown';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isAdminDashboard = location.pathname.includes('/dashboard/admin');
  
  const clubNavItems = [
    { icon: Home, label: 'Overview', href: '/dashboard/club' },
    { icon: Users, label: 'Members', href: '/dashboard/club?tab=members' },
    { icon: Calendar, label: 'Events', href: '/dashboard/club?tab=events' },
    { icon: BarChart3, label: 'Reports', href: '/dashboard/club?tab=reports' },
    { icon: Settings, label: 'Settings', href: '/dashboard/club?tab=settings' }
  ];
  
  const adminNavItems = [
    { icon: Home, label: 'Overview', href: '/dashboard/admin' },
    { icon: CheckSquare, label: 'Approvals', href: '/dashboard/admin?tab=approvals' },
    { icon: FileText, label: 'Reports', href: '/dashboard/admin?tab=reports' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/admin?tab=analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/admin?tab=settings' }
  ];
  
  const navItems = isAdminDashboard ? adminNavItems : clubNavItems;
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Redirecting to home page...",
    });
    
    setTimeout(() => navigate('/'), 1500);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    
    toast({
      title: isDarkMode ? "Light Mode Activated" : "Dark Mode Activated",
      description: "Your preference has been saved",
    });
  };
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col md:flex-row transition-colors duration-300",
      isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    )}>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="text-lg font-bold">ClubPulse</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <NotificationDropdown />
        </div>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-0 z-50 md:static md:z-0 md:w-64 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:flex flex-col h-full"
        )}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="text-xl font-bold text-primary">ClubPulse</Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex flex-col justify-between h-full overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  location.pathname + location.search === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto px-3 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-xl font-bold">
            {isAdminDashboard ? 'Admin Dashboard' : 'Club Dashboard'}
          </h1>
          
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            
            <div className="flex items-center gap-3 border-l border-gray-200 dark:border-gray-700 pl-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                JD
              </div>
              <div className="hidden md:block">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Club President</div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
