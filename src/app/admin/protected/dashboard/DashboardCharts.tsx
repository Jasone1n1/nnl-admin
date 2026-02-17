'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-kit/card';
import { Badge } from '@/components/ui-kit/badge';

interface Props {
  totalApplicationsToday: number;
  totalApplications: number;
  targetApplications: number;
  loginData: { date: string; logins: number }[];
  users: { _id: string; username: string; isActive: boolean }[];
}

export default function DashboardCharts({
  totalApplicationsToday,
  totalApplications,
  targetApplications,
  loginData,
  users,
}: Props) {
  const progressPct = targetApplications > 0
    ? Math.min(100, Math.round((totalApplicationsToday / targetApplications) * 100))
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of applications and activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Applications Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={[
                    { name: 'Today', value: totalApplicationsToday },
                    {
                      name: 'Remaining',
                      value: Math.max(targetApplications - totalApplicationsToday, 0),
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={64}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  <Cell fill="#059669" />
                  <Cell fill="#e2e8f0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-sm font-medium text-slate-600">
              Total applications: {totalApplications.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">24h Intake Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="size-32" role="img" aria-label={`${progressPct}% of daily target`}>
              <CircularProgressbar
                value={progressPct}
                text={`${progressPct}%`}
                styles={buildStyles({
                  textColor: '#0f172a',
                  pathColor: '#059669',
                  trailColor: '#e2e8f0',
                  textSize: '1.25rem',
                })}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Target: {targetApplications} per day
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Admin Login Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={loginData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="logins"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Employee Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-slate-200" role="list">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <span className="font-medium text-slate-900">{user.username}</span>
                <Badge variant={user.isActive ? 'success' : 'destructive'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
