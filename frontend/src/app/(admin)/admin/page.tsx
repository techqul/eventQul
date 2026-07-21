"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const platformStats = [
  {
    title: "Total Revenue",
    value: "৳ 12.5M",
    change: "+18.2%",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Active Events",
    value: "156",
    change: "+12 this week",
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Total Users",
    value: "24,500",
    change: "+845 this month",
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Organizers",
    value: "320",
    change: "+15 this month",
    icon: Users,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const revenueData = [
  { month: "Jul", revenue: 8500000 },
  { month: "Aug", revenue: 9200000 },
  { month: "Sep", revenue: 8800000 },
  { month: "Oct", revenue: 10500000 },
  { month: "Nov", revenue: 11200000 },
  { month: "Dec", revenue: 12500000 },
];

const userGrowthData = [
  { month: "Jul", users: 18500 },
  { month: "Aug", users: 19800 },
  { month: "Sep", users: 21200 },
  { month: "Oct", users: 22400 },
  { month: "Nov", users: 23600 },
  { month: "Dec", users: 24500 },
];

const categoryData = [
  { name: "Concerts", value: 35, color: "#7C3AED" },
  { name: "Tech", value: 20, color: "#3B82F6" },
  { name: "Corporate", value: 18, color: "#10B981" },
  { name: "Sports", value: 12, color: "#F59E0B" },
  { name: "Others", value: 15, color: "#EF4444" },
];

const recentActivity = [
  { id: 1, action: "New organizer registered", entity: "Dhaka Events Hub", time: "2 hours ago" },
  { id: 2, action: "Event created", entity: "James LIVE in Dhaka", time: "5 hours ago" },
  { id: 3, action: "User milestone", entity: "1000 tickets sold for BPL Final", time: "1 day ago" },
  { id: 4, action: "Revenue target reached", entity: "৳ 10M this month", time: "2 days ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Overview of platform performance and metrics
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
      >
        {platformStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card>
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm text-green-500">
                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">{stat.change}</span>
                    <span className="xs:hidden">+{stat.change.split('.')[0]}%</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 line-clamp-1">
                  {stat.title}
                </p>
                <p className="text-lg sm:text-2xl font-bold truncate">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2 sm:pb-0">
              <CardTitle className="text-base sm:text-lg">Platform Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    className="text-muted-foreground"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `৳${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [
                      `৳ ${(value / 1000000).toFixed(1)}M`,
                      "Revenue",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2 sm:pb-0">
              <CardTitle className="text-base sm:text-lg">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    className="text-muted-foreground"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2 sm:pb-0">
              <CardTitle className="text-base sm:text-lg">Events by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={categoryData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    type="category"
                    dataKey="name"
                    className="text-muted-foreground"
                    tick={{ fontSize: 10 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={40}
                  />
                  <YAxis type="number" className="text-muted-foreground" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-2 sm:pb-0">
              <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:font-medium truncate">{activity.action}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {activity.entity}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
