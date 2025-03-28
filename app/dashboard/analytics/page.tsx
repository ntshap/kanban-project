'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from './components/metric-card';
import { ProgressMetric } from './components/progress-metric';
import { DataTable } from './components/data-table';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Star,
} from 'lucide-react';

// Mock data
const mockData = {
  overview: {
    totalUsers: 1234,
    activeEvents: 45,
    revenue: 52890,
    engagementRate: 68,
    messagesSent: 8976,
    averageRating: 4.7,
  },
  trends: {
    users: +15.2,
    events: +8.1,
    revenue: +12.5,
    engagement: -2.3,
    messages: +25.8,
    rating: +1.2,
  },
  goals: {
    monthlyUsers: { current: 1234, target: 2000 },
    monthlyEvents: { current: 45, target: 50 },
    monthlyRevenue: { current: 52890, target: 75000 },
  },
  topEvents: [
    { name: 'Summer Music Festival', attendees: 520, revenue: 15600, rating: 4.8 },
    { name: 'Tech Conference 2025', attendees: 350, revenue: 10500, rating: 4.6 },
    { name: 'Food & Wine Expo', attendees: 420, revenue: 12600, rating: 4.7 },
    { name: 'Art Gallery Opening', attendees: 180, revenue: 5400, rating: 4.9 },
    { name: 'Fitness Workshop', attendees: 150, revenue: 4500, rating: 4.5 },
  ],
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Total Users"
              value={mockData.overview.totalUsers.toLocaleString()}
              icon={<Users />}
              trend={{ value: mockData.trends.users, isPositive: true }}
            />
            <MetricCard
              title="Active Events"
              value={mockData.overview.activeEvents}
              icon={<Calendar />}
              trend={{ value: mockData.trends.events, isPositive: true }}
            />
            <MetricCard
              title="Total Revenue"
              value={`$${mockData.overview.revenue.toLocaleString()}`}
              icon={<DollarSign />}
              trend={{ value: mockData.trends.revenue, isPositive: true }}
            />
            <MetricCard
              title="Engagement Rate"
              value={`${mockData.overview.engagementRate}%`}
              icon={<TrendingUp />}
              trend={{ value: mockData.trends.engagement, isPositive: false }}
            />
            <MetricCard
              title="Messages Sent"
              value={mockData.overview.messagesSent.toLocaleString()}
              icon={<MessageSquare />}
              trend={{ value: mockData.trends.messages, isPositive: true }}
            />
            <MetricCard
              title="Average Rating"
              value={mockData.overview.averageRating}
              icon={<Star />}
              trend={{ value: mockData.trends.rating, isPositive: true }}
            />
          </div>

          {/* Progress Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <ProgressMetric
              title="Monthly Users Goal"
              value={mockData.goals.monthlyUsers.current}
              target={mockData.goals.monthlyUsers.target}
              description="Track progress towards user acquisition target"
            />
            <ProgressMetric
              title="Monthly Events Goal"
              value={mockData.goals.monthlyEvents.current}
              target={mockData.goals.monthlyEvents.target}
              description="Track progress towards event creation target"
            />
            <ProgressMetric
              title="Monthly Revenue Goal"
              value={mockData.goals.monthlyRevenue.current}
              target={mockData.goals.monthlyRevenue.target}
              description="Track progress towards revenue target"
            />
          </div>

          {/* Top Events Table */}
          <DataTable
            title="Top Performing Events"
            columns={[
              { key: 'name', label: 'Event Name' },
              { key: 'attendees', label: 'Attendees' },
              { key: 'revenue', label: 'Revenue' },
              { key: 'rating', label: 'Rating' },
            ]}
            data={mockData.topEvents.map(event => ({
              ...event,
              revenue: `$${event.revenue.toLocaleString()}`,
            }))}
          />
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Events Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed events analytics coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed user analytics coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed revenue analytics coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
