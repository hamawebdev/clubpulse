
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardWidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

const DashboardWidget = ({ 
  title, 
  children, 
  className,
  actions
}: DashboardWidgetProps) => {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </CardHeader>
      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardWidget;
