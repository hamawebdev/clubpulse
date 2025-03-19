
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import { 
  Area, 
  Bar, 
  LineChart, 
  BarChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import DashboardWidget from './DashboardWidget';

type ChartType = 'line' | 'bar' | 'area';

interface ChartWidgetProps {
  title: string;
  data: any[];
  type?: ChartType;
  dataKeys: string[];
  xAxisKey?: string;
  height?: number;
  className?: string;
  config?: ChartConfig;
  actions?: React.ReactNode;
}

const ChartWidget = ({
  title,
  data,
  type = 'line',
  dataKeys,
  xAxisKey = 'name',
  height = 300,
  className,
  config,
  actions
}: ChartWidgetProps) => {
  
  // Create a default config if none is provided
  const chartConfig: ChartConfig = config || 
    dataKeys.reduce((acc, key) => {
      acc[key] = { 
        label: key.charAt(0).toUpperCase() + key.slice(1),
        theme: { light: '#3b82f6', dark: '#60a5fa' }
      };
      return acc;
    }, {} as ChartConfig);
  
  return (
    <DashboardWidget title={title} className={className} actions={actions}>
      <div className="w-full p-4" style={{ height }}>
        <ChartContainer config={chartConfig}>
          {type === 'line' && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxisKey} 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <ChartLegend content={<ChartLegendContent />} />
              {dataKeys.map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={`var(--color-${key})`}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          )}
          
          {type === 'bar' && (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxisKey} 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <ChartLegend content={<ChartLegendContent />} />
              {dataKeys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={`var(--color-${key})`}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          )}
          
          {type === 'area' && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxisKey} 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <ChartLegend content={<ChartLegendContent />} />
              {dataKeys.map((key) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={`var(--color-${key})`}
                  fill={`var(--color-${key})`}
                  fillOpacity={0.2}
                />
              ))}
            </LineChart>
          )}
        </ChartContainer>
      </div>
    </DashboardWidget>
  );
};

export default ChartWidget;
