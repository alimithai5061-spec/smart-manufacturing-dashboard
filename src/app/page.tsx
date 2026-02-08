'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, AlertTriangle, BarChart3, Bell, Boxes, 
  Calendar, ChevronRight, ClipboardList, Cpu, Download,
  Factory, Gauge, Heart, Home, LayoutDashboard, 
  Layers, Link2, Menu, Moon, RefreshCw,
  Settings, Shield, Sparkles, Sun, Thermometer, 
  TrendingUp, User, Zap, X, Wrench, Scan,
  Package, AlertCircle, CheckCircle, Info, Flame,
  Droplets, Wind, FileText, Search, Maximize2,
  Minimize2, Users, Clock, AlertOctagon, Database,
  Brain, Eye, Sliders, Briefcase, Target, Play,
  Pause, ArrowUpRight, ArrowDownRight, Wifi,
  Server, HardDrive, Network, PlugZap, Wrench as WrenchIcon,
  GaugeCircle, TrendingDown, FileSpreadsheet, Filter,
  Plus, Edit3, Trash2, MoreVertical, CalendarDays,
  Timer, Workflow, Building2, MapPin, Truck,
  ShoppingCart, Warehouse, Inbox, Package2,
  BarChart as BarChartIcon, PieChart as PieChartIcon,
  LineChart as LineChartIcon, ZapOff, BatteryCharging,
  Settings2, UserCog, BellRing, ShieldCheck,
  MonitorPlay, Bot, Target as TargetIcon, Award,
  Star, Zap as Bolt, Flame as Fire, DollarSign, Coffee
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, Legend, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart
} from 'recharts'

// Mock data generation
const generateRealtimeData = (count: number, min: number, max: number) => 
  Array.from({ length: count }, (_, i) => ({
    time: `${i}:00`,
    value: Math.floor(Math.random() * (max - min + 1)) + min
  }))

const generateTimelineData = (days: number) => 
  Array.from({ length: days }, (_, i) => ({
    date: `Day ${i + 1}`,
    production: Math.floor(Math.random() * 500) + 1000,
    target: 1400
  }))

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

const pageVariants = {
  initial: { opacity: 0, x: -20, scale: 0.98 },
  in: { opacity: 1, x: 0, scale: 1 },
  out: { opacity: 0, x: 20, scale: 0.98 }
}

const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut'
    }
  })
}

export default function SmartManufacturingDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isExpanded, setIsExpanded] = useState(false)

  // Real-time data states
  const [productionData, setProductionData] = useState(generateRealtimeData(24, 80, 120))
  const [energyData, setEnergyData] = useState(generateRealtimeData(24, 100, 500))
  const [oeeData, setOeeData] = useState({ availability: 92, performance: 88, quality: 95 })
  const [defectRate, setDefectRate] = useState(2.3)
  const [temperature, setTemperature] = useState(23.5)
  const [humidity, setHumidity] = useState(45)
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'Machine #3 requiring maintenance', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Energy consumption above threshold', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Production quota reached', time: '1 hour ago' }
  ])

  // Manual refresh function
  const handleManualRefresh = () => {
    setProductionData(generateRealtimeData(24, 80, 120))
    setEnergyData(generateRealtimeData(24, 100, 500))
    setOeeData({
      availability: Math.floor(Math.random() * 15) + 85,
      performance: Math.floor(Math.random() * 15) + 85,
      quality: Math.floor(Math.random() * 10) + 90
    })
    setDefectRate(Math.random() * 3 + 1)
    setTemperature(+(20 + Math.random() * 10).toFixed(1))
    setHumidity(Math.floor(Math.random() * 30) + 40)
  }

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: Activity, label: 'Production', id: 'production' },
    { icon: Cpu, label: 'Machines', id: 'machines' },
    { icon: Zap, label: 'Energy', id: 'energy' },
    { icon: Gauge, label: 'OEE', id: 'oee' },
    { icon: Shield, label: 'Quality', id: 'quality' },
    { icon: Boxes, label: 'Inventory', id: 'inventory' },
    { icon: TrendingUp, label: 'Analytics', id: 'analytics' },
    { icon: Brain, label: 'AI Insights', id: 'ai' },
    { icon: Users, label: 'Workforce', id: 'workforce' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ]

  // Overview Tab Content
  const OverviewContent = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-6"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Production Rate', value: '1,247', unit: 'units/hr', icon: Activity, color: 'emerald', change: '+12%' },
          { label: 'OEE Score', value: `${((oeeData.availability + oeeData.performance + oeeData.quality) / 3).toFixed(1)}%`, unit: '', icon: Gauge, color: 'blue', change: '+3%' },
          { label: 'Active Machines', value: '18/20', unit: 'running', icon: Cpu, color: 'purple', change: '90%' },
          { label: 'Energy Usage', value: '4,231', unit: 'kWh', icon: Zap, color: 'amber', change: '-8%' }
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{kpi.label}</p>
                    <motion.p
                      key={kpi.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-bold text-gray-900 dark:text-white mt-2"
                    >
                      {kpi.value}
                      <span className="text-sm font-normal text-gray-500 ml-1">{kpi.unit}</span>
                    </motion.p>
                    <motion.div 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge variant={kpi.change.startsWith('+') ? 'default' : 'secondary'} className="mt-3">
                        {kpi.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {kpi.change} from last hour
                      </Badge>
                    </motion.div>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl flex items-center justify-center"
                  >
                    <kpi.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-5 h-5 text-emerald-500" />
                </motion.div>
                Real-Time Production
              </CardTitle>
              <CardDescription>Live production output monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={productionData}>
                  <defs>
                    <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorProduction)"
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-500" />
                OEE Breakdown
              </CardTitle>
              <CardDescription>Overall Equipment Effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[
                  { label: 'Availability', value: oeeData.availability, color: 'bg-emerald-500' },
                  { label: 'Performance', value: oeeData.performance, color: 'bg-blue-500' },
                  { label: 'Quality', value: oeeData.quality, color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.label}</span>
                      <motion.span
                        key={item.value}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        className="text-sm font-bold text-gray-900 dark:text-white"
                      >
                        {item.value.toFixed(1)}%
                      </motion.span>
                    </div>
                    <Progress value={item.value} className="h-3" />
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  className="mt-6 text-center p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800"
                >
                  <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {((oeeData.availability + oeeData.performance + oeeData.quality) / 3).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">Overall OEE</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Alerts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Recent Alerts
            </CardTitle>
            <CardDescription>System notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className={`p-4 rounded-lg border-l-4 flex items-start gap-3 transition-all duration-300 ${
                    alert.type === 'critical' ? 'bg-red-50 dark:bg-red-900/20 border-red-500 hover:shadow-md' :
                    alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 hover:shadow-md' :
                    'bg-blue-50 dark:bg-blue-900/20 border-blue-500 hover:shadow-md'
                  }`}
                >
                  <motion.div
                    animate={alert.type === 'critical' ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : alert.type === 'warning' ? {
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {alert.type === 'critical' ? (
                      <AlertOctagon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : alert.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{alert.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                  </div>
                  <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                    View
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  // Production Tab Content
  const ProductionContent = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-6"
    >
      {/* Production Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Today\'s Output', value: '24,567', unit: 'units', icon: Package, trend: '+15%' },
          { label: 'Efficiency Rate', value: '94.2', unit: '%', icon: TrendingUp, trend: '+2.3%' },
          { label: 'Cycle Time', value: '45.3', unit: 'sec', icon: Timer, trend: '-5%' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4"
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}<span className="text-sm font-normal text-gray-500 ml-1">{stat.unit}</span>
                </p>
                <Badge className="mt-2 bg-blue-500">{stat.trend}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Production Timeline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Production Timeline
            </CardTitle>
            <CardDescription>30-day production overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={generateTimelineData(30)}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="production" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-orange-500" />
              Active Production Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { order: 'ORD-2024-001', product: 'Widget A', progress: 75, status: 'In Progress' },
                { order: 'ORD-2024-002', product: 'Widget B', progress: 45, status: 'In Progress' },
                { order: 'ORD-2024-003', product: 'Widget C', progress: 90, status: 'Almost Done' },
                { order: 'ORD-2024-004', product: 'Widget D', progress: 20, status: 'Started' }
              ].map((order, i) => (
                <motion.div
                  key={order.order}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{order.order}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.product}</p>
                    </div>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={order.progress} className="flex-1" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{order.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  // Machines Tab Content
  const MachinesContent = () => {
    const machines = [
      { id: 1, name: 'CNC Milling Machine-01', status: 'running', health: 95, efficiency: 92, uptime: '99.2%' },
      { id: 2, name: 'Robot Arm Assembly-01', status: 'running', health: 88, efficiency: 89, uptime: '98.5%' },
      { id: 3, name: 'Hydraulic Press-03', status: 'warning', health: 65, efficiency: 72, uptime: '94.1%' },
      { id: 4, name: 'Conveyor System Main', status: 'running', health: 97, efficiency: 95, uptime: '99.8%' },
      { id: 5, name: 'Welding Robot-02', status: 'stopped', health: 100, efficiency: 0, uptime: '95.3%' },
      { id: 6, name: 'Quality Scanner Pro', status: 'running', health: 92, efficiency: 94, uptime: '98.9%' },
      { id: 7, name: 'Packaging Unit-01', status: 'running', health: 90, efficiency: 91, uptime: '97.6%' },
      { id: 8, name: 'Laser Cutter-02', status: 'maintenance', health: 70, efficiency: 0, uptime: '92.4%' }
    ]

    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="space-y-6"
      >
        {/* Machine Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Machines', value: '8', icon: Cpu, color: 'blue' },
            { label: 'Running', value: '5', icon: Play, color: 'green' },
            { label: 'Stopped', value: '1', icon: Pause, color: 'red' },
            { label: 'Maintenance', value: '2', icon: WrenchIcon, color: 'amber' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3"
                  >
                    <stat.icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                  </motion.div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Machine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {machines.map((machine, i) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="cursor-pointer"
            >
              <Card className={`h-full transition-all duration-300 border-l-4 ${
                machine.status === 'running' ? 'border-l-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20' :
                machine.status === 'warning' ? 'border-l-amber-500 hover:shadow-xl hover:shadow-amber-500/20' :
                machine.status === 'stopped' ? 'border-l-red-500 hover:shadow-xl hover:shadow-red-500/20' :
                'border-l-purple-500 hover:shadow-xl hover:shadow-purple-500/20'
              }`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <motion.h4 
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {machine.name}
                      </motion.h4>
                      <Badge
                        variant="outline"
                        className={`mt-2 ${
                          machine.status === 'running' ? 'text-emerald-600 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' :
                          machine.status === 'warning' ? 'text-amber-600 border-amber-600 bg-amber-50 dark:bg-amber-900/20' :
                          machine.status === 'stopped' ? 'text-red-600 border-red-600 bg-red-50 dark:bg-red-900/20' :
                          'text-purple-600 border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        }`}
                      >
                        <motion.span
                          animate={machine.status === 'running' ? { 
                            opacity: [1, 0.5, 1],
                            scale: [1, 1.2, 1]
                          } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`inline-block w-2 h-2 rounded-full mr-1 ${
                            machine.status === 'running' ? 'bg-emerald-500' :
                            machine.status === 'warning' ? 'bg-amber-500' :
                            machine.status === 'stopped' ? 'bg-red-500' :
                            'bg-purple-500'
                          }`}
                        />
                        {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                      </Badge>
                    </div>
                    <motion.div
                      animate={machine.status === 'running' ? {
                        rotate: [0, 360]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Cpu className={`w-8 h-8 ${
                        machine.status === 'running' ? 'text-emerald-500' :
                        machine.status === 'warning' ? 'text-amber-500' :
                        machine.status === 'stopped' ? 'text-red-500' :
                        'text-purple-500'
                      }`} />
                    </motion.div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Health</span>
                        <motion.span 
                          key={machine.health}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          className="font-medium text-gray-900 dark:text-white"
                        >
                          {machine.health}%
                        </motion.span>
                      </div>
                      <Progress value={machine.health} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Efficiency</span>
                        <span className="font-medium text-gray-900 dark:text-white">{machine.efficiency}%</span>
                      </div>
                      <Progress value={machine.efficiency} className="h-2" />
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Uptime</span>
                      <span className="font-medium text-gray-900 dark:text-white">{machine.uptime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  // Energy Tab Content
  const EnergyContent = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-6"
    >
      {/* Energy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Consumption', value: '4,231', unit: 'kWh', icon: Zap, change: '-8%', color: 'amber' },
          { label: 'Peak Demand', value: '892', unit: 'kW', icon: ZapOff, change: '+2%', color: 'red' },
          { label: 'Power Factor', value: '0.94', unit: '', icon: GaugeCircle, change: '+0.02', color: 'green' },
          { label: 'Cost Today', value: '$342', unit: '', icon: DollarSign, change: '-12%', color: 'blue' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center mb-4"
                >
                  <stat.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </motion.div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}<span className="text-sm font-normal text-gray-500 ml-1">{stat.unit}</span>
                </p>
                <Badge variant={stat.change.startsWith('+') ? 'destructive' : 'default'} className="mt-2">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Energy Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="w-5 h-5 text-amber-500" />
              Energy Consumption (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]}>
                  {[...Array(24)].map((_, i) => (
                    <Cell key={`cell-${i}`} fill={`rgba(245, 158, 11, ${0.5 + (i % 3) * 0.2})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Energy Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Energy Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Grid', value: 45 },
                      { name: 'Solar', value: 30 },
                      { name: 'Wind', value: 15 },
                      { name: 'Battery', value: 10 }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {[...Array(4)].map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Energy by Department</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Production', usage: 45, color: 'bg-blue-500' },
                { name: 'Assembly', usage: 25, color: 'bg-purple-500' },
                { name: 'Packaging', usage: 15, color: 'bg-emerald-500' },
                { name: 'Office', usage: 10, color: 'bg-amber-500' },
                { name: 'Other', usage: 5, color: 'bg-gray-500' }
              ].map((dept, i) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dept.name}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{dept.usage}%</span>
                  </div>
                  <Progress value={dept.usage} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )

  // OEE Tab Content
  const OEEContent = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-6"
    >
      {/* OEE Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Availability', value: oeeData.availability, icon: Clock, desc: 'Time equipment is available for production' },
          { label: 'Performance', value: oeeData.performance, icon: TrendingUp, desc: 'Speed at which the line runs' },
          { label: 'Quality', value: oeeData.quality, icon: ShieldCheck, desc: 'Good parts vs total parts produced' }
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, type: 'spring' }}
          >
            <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-8">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <item.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.label}</h3>
                <motion.p
                  key={item.value}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-5xl font-bold text-blue-600 dark:text-blue-400 my-4"
                >
                  {item.value.toFixed(1)}%
                </motion.p>
                <Progress value={item.value} className="h-3 mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Overall OEE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Overall Equipment Effectiveness</h2>
            <motion.p
              key={((oeeData.availability + oeeData.performance + oeeData.quality) / 3).toFixed(1)}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="text-7xl font-bold my-6"
            >
              {((oeeData.availability + oeeData.performance + oeeData.quality) / 3).toFixed(1)}%
            </motion.p>
            <div className="flex justify-center gap-8 mt-6">
              {[
                { label: 'World Class', value: '>85%' },
                { label: 'Target', value: '80%' },
                { label: 'Current', value: `${((oeeData.availability + oeeData.performance + oeeData.quality) / 3).toFixed(1)}%` }
              ].map((benchmark, i) => (
                <div key={benchmark.label} className="text-center">
                  <p className="text-sm opacity-80">{benchmark.label}</p>
                  <p className="text-2xl font-bold">{benchmark.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* OEE Trend */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>OEE Trend (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={generateTimelineData(30).map(d => ({ ...d, oee: Math.random() * 15 + 80 }))}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis domain={[70, 100]} className="text-xs" />
                <RechartsTooltip />
                <Line type="monotone" dataKey="oee" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  // Quality Tab Content
  const QualityContent = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-6"
    >
      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'First Pass Yield', value: '97.7', unit: '%', icon: CheckCircle, color: 'emerald' },
          { label: 'Defect Rate', value: defectRate.toFixed(1), unit: '%', icon: AlertTriangle, color: 'amber' },
          { label: 'Inspections', value: '156', unit: 'today', icon: Eye, color: 'blue' },
          { label: 'Quality Score', value: '94', unit: '/100', icon: Award, color: 'purple' }
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="text-center hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center mx-auto mb-4"
                >
                  <metric.icon className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                </motion.div>
                <motion.p
                  key={metric.value}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                >
                  {metric.value}<span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
                </motion.p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{metric.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quality Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Defect Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Surface', value: 35 },
                      { name: 'Dimensional', value: 28 },
                      { name: 'Assembly', value: 22 },
                      { name: 'Functional', value: 15 }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {[...Array(4)].map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quality Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateTimelineData(14).map(d => ({ ...d, quality: Math.random() * 5 + 95 }))}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis domain={[90, 100]} className="text-xs" />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="quality" stroke="#14b8a6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Inspections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-500" />
              Recent Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'INS-001', batch: 'BATCH-234', result: 'Pass', inspector: 'John D.' },
                { id: 'INS-002', batch: 'BATCH-235', result: 'Pass', inspector: 'Sarah M.' },
                { id: 'INS-003', batch: 'BATCH-236', result: 'Fail', inspector: 'Mike R.' },
                { id: 'INS-004', batch: 'BATCH-237', result: 'Pass', inspector: 'Emily K.' }
              ].map((inspection, i) => (
                <motion.div
                  key={inspection.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{inspection.id} - {inspection.batch}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Inspector: {inspection.inspector}</p>
                  </div>
                  <Badge variant={inspection.result === 'Pass' ? 'default' : 'destructive'}>
                    {inspection.result}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  // Inventory Tab Content
  const InventoryContent = () => {
    const inventory = [
      { name: 'Raw Steel', level: 78, unit: 'tons', min: 30, max: 100, location: 'Warehouse A', trend: 'up' },
      { name: 'Plastic Pellets', level: 45, unit: 'kg', min: 50, max: 200, location: 'Warehouse B', trend: 'down' },
      { name: 'Electronic Components', level: 92, unit: 'units', min: 100, max: 500, location: 'Warehouse C', trend: 'stable' },
      { name: 'Packaging Materials', level: 67, unit: 'boxes', min: 50, max: 150, location: 'Warehouse A', trend: 'up' },
      { name: 'Fasteners', level: 85, unit: 'kg', min: 40, max: 120, location: 'Warehouse B', trend: 'stable' },
      { name: 'Lubricants', level: 23, unit: 'liters', min: 30, max: 100, location: 'Warehouse C', trend: 'down' }
    ]

    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="space-y-6"
      >
        {/* Inventory Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Items', value: '1,247', icon: Package, color: 'blue' },
            { label: 'Low Stock', value: '23', icon: AlertTriangle, color: 'amber' },
            { label: 'Out of Stock', value: '5', icon: X, color: 'red' },
            { label: 'Total Value', value: '$2.4M', icon: DollarSign, color: 'green' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4"
                  >
                    <stat.icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Inventory Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-indigo-500" />
                Inventory Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="p-5 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                          <Badge variant={item.level < item.min ? 'destructive' : item.level > item.max * 0.9 ? 'default' : 'secondary'}>
                            {item.level < item.min ? 'Low Stock' : item.level > item.max * 0.9 ? 'High Stock' : 'Normal'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location: {item.location}</p>
                      </div>
                      <motion.div
                        animate={item.trend === 'up' ? { y: [0, -5, 0] } : item.trend === 'down' ? { y: [0, 5, 0] } : {}}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                      >
                        {item.trend === 'up' ? <TrendingUp className="w-5 h-5 text-emerald-500" /> :
                         item.trend === 'down' ? <TrendingDown className="w-5 h-5 text-red-500" /> :
                         <Package2 className="w-5 h-5 text-gray-500" />}
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Current: {item.level} {item.unit}</span>
                        <span className="text-gray-600 dark:text-gray-400">Range: {item.min} - {item.max} {item.unit}</span>
                      </div>
                      <Progress 
                        value={(item.level / item.max) * 100} 
                        className={`h-3 ${item.level < item.min ? '[&>div]:bg-red-500' : item.level > item.max * 0.9 ? '[&>div]:bg-amber-500' : ''}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  // Analytics Tab Content
  const AnalyticsContent = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-6"
    >
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Production Analytics</h3>
          <p className="text-gray-500 dark:text-gray-400">Comprehensive data analysis and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Production vs Target</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={generateTimelineData(14)}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="production" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={[
                  { metric: 'Speed', value: 85 },
                  { metric: 'Quality', value: 92 },
                  { metric: 'Availability', value: 88 },
                  { metric: 'Utilization', value: 78 },
                  { metric: 'Yield', value: 95 },
                  { metric: 'OEE', value: 83 }
                ]}>
                  <PolarGrid className="stroke-gray-200 dark:stroke-gray-700" />
                  <PolarAngleAxis dataKey="metric" className="text-xs" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                  <Radar name="Metrics" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'This Week', value: 12500, change: '+12%' },
                { title: 'Last Week', value: 11160, change: '-3%' },
                { title: 'Same Period Last Year', value: 9800, change: '+28%' }
              ].map((period, i) => (
                <motion.div
                  key={period.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{period.title}</p>
                  <motion.p
                    key={period.value}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    {period.value.toLocaleString()}
                  </motion.p>
                  <Badge variant={period.change.startsWith('+') ? 'default' : 'destructive'}>
                    {period.change}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  // AI Insights Tab Content
  const AIInsightsContent = () => {
    const insights = [
      { 
        type: 'prediction', 
        icon: Brain,
        title: 'Predictive Maintenance', 
        description: 'Machine #3 has 87% probability of failure in next 48 hours. Schedule maintenance immediately.',
        impact: 'high',
        action: 'Schedule Maintenance',
        confidence: 87
      },
      { 
        type: 'optimization', 
        icon: Zap,
        title: 'Energy Optimization', 
        description: 'Reduce energy costs by 12% by adjusting shift schedules and optimizing machine idle times.',
        impact: 'medium',
        action: 'View Recommendations',
        confidence: 92
      },
      { 
        type: 'quality', 
        icon: Shield,
        title: 'Quality Trend Analysis', 
        description: 'Defect rate decreasing by 0.3% daily. Current quality control protocols are highly effective.',
        impact: 'low',
        action: 'View Details',
        confidence: 95
      },
      { 
        type: 'production', 
        icon: TrendingUp,
        title: 'Production Forecast', 
        description: 'Based on current trends, production will increase by 8% next month if conditions remain stable.',
        impact: 'medium',
        action: 'View Forecast',
        confidence: 78
      },
      { 
        type: 'anomaly', 
        icon: AlertTriangle,
        title: 'Anomaly Detected', 
        description: 'Unusual vibration patterns detected in Conveyor System. Potential bearing wear identified.',
        impact: 'high',
        action: 'Investigate',
        confidence: 83
      },
      { 
        type: 'efficiency', 
        icon: Gauge,
        title: 'Efficiency Opportunity', 
        description: 'Robot Arm A operates at 89% efficiency. Calibration could improve to 94%.',
        impact: 'low',
        action: 'Schedule Calibration',
        confidence: 89
      }
    ]

    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="space-y-6"
      >
        {/* AI Header */}
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center"
          >
            <Bot className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered Insights</h3>
            <p className="text-gray-500 dark:text-gray-400">Machine learning predictions and recommendations</p>
          </div>
        </div>

        {/* AI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Active Models', value: '12', icon: Brain, color: 'violet' },
            { label: 'Predictions Today', value: '247', icon: TargetIcon, color: 'blue' },
            { label: 'Accuracy Rate', value: '94.2%', icon: Award, color: 'emerald' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4"
                  >
                    <stat.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </motion.div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Card className={`h-full border-l-4 transition-all duration-300 hover:shadow-xl ${
                insight.impact === 'high' ? 'border-l-red-500' :
                insight.impact === 'medium' ? 'border-l-amber-500' :
                'border-l-emerald-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        insight.impact === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                        insight.impact === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30' :
                        'bg-emerald-100 dark:bg-emerald-900/30'
                      }`}
                    >
                      <insight.icon className={`w-6 h-6 ${
                        insight.impact === 'high' ? 'text-red-600 dark:text-red-400' :
                        insight.impact === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                        'text-emerald-600 dark:text-emerald-400'
                      }`} />
                    </motion.div>
                    <div className="text-right">
                      <Badge variant={
                        insight.impact === 'high' ? 'destructive' :
                        insight.impact === 'medium' ? 'default' :
                        'secondary'
                      }>
                        {insight.impact} impact
                      </Badge>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {insight.confidence}% confidence
                      </p>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{insight.description}</p>
                  <Button className="w-full" size="sm">
                    {insight.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  // Workforce Tab Content
  const WorkforceContent = () => {
    const workers = [
      { name: 'John Smith', role: 'Machine Operator', efficiency: 92, output: 156, status: 'active' },
      { name: 'Sarah Johnson', role: 'Quality Inspector', efficiency: 88, output: 142, status: 'active' },
      { name: 'Mike Williams', role: 'Assembly Tech', efficiency: 95, output: 168, status: 'active' },
      { name: 'Emily Davis', role: 'Packaging', efficiency: 85, output: 135, status: 'break' },
      { name: 'Chris Brown', role: 'Maintenance', efficiency: 90, output: 148, status: 'active' }
    ]

    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="space-y-6"
      >
        {/* Workforce Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Workers', value: '47', icon: Users, color: 'blue' },
            { label: 'On Shift', value: '42', icon: User, color: 'emerald' },
            { label: 'On Break', value: '5', icon: Coffee, color: 'amber' },
            { label: 'Avg Efficiency', value: '91%', icon: Gauge, color: 'purple' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4"
                  >
                    <stat.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </motion.div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Worker Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-500" />
                Worker Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                  <RechartsTooltip />
                  <Bar dataKey="efficiency" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Worker List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Active Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workers.map((worker, i) => (
                  <motion.div
                    key={worker.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={worker.status === 'active' ? {
                          scale: [1, 1.2, 1],
                          boxShadow: ['0 0 0 0 rgba(6, 182, 212, 0.7)', '0 0 0 10px rgba(6, 182, 212, 0)']
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                      >
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </motion.div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{worker.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{worker.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">{worker.efficiency}% efficiency</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{worker.output} units</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  // Settings Tab Content
  const SettingsContent = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Settings</h3>
        <p className="text-gray-500 dark:text-gray-400">Customize your dashboard experience</p>
      </div>

      {/* Display Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MonitorPlay className="w-5 h-5 text-gray-600" />
              Display Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark/light theme</p>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Compact View</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Show more content on screen</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Animations</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enable smooth animations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-gray-600" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive browser notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Alerts</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get alerts via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Sound Effects</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Play sounds for alerts</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Refresh Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-gray-600" />
              Data Refresh Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900 dark:text-white">Refresh Interval</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 seconds</p>
              </div>
              <Slider defaultValue={[2]} max={60} min={1} step={1} className="w-full" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Auto Refresh</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically refresh data</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="w-5 h-5 text-gray-600" />
              User Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <ShieldCheck className="w-4 h-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Settings2 className="w-4 h-4" />
              Preferences
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewContent />
      case 'production': return <ProductionContent />
      case 'machines': return <MachinesContent />
      case 'energy': return <EnergyContent />
      case 'oee': return <OEEContent />
      case 'quality': return <QualityContent />
      case 'inventory': return <InventoryContent />
      case 'analytics': return <AnalyticsContent />
      case 'ai': return <AIInsightsContent />
      case 'workforce': return <WorkforceContent />
      case 'settings': return <SettingsContent />
      default: return <OverviewContent />
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-1 flex bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <motion.aside
          initial={{ width: isSidebarOpen ? 280 : 80 }}
          animate={{ width: isSidebarOpen ? 280 : 80 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-20"
        >
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <Factory className="w-6 h-6 text-white" />
            </motion.div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="font-bold text-lg text-gray-900 dark:text-white">SmartFactory</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard v2.0</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={activeTab === item.id ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 1, repeat: activeTab === item.id ? Infinity : 0, repeatDelay: 1 }}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                  </motion.div>
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </nav>
          </ScrollArea>

          {/* User & Settings */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                  >
                    <User className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Plant Manager</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex-1"
              >
                <motion.div
                  animate={{ rotate: isSidebarOpen ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isSidebarOpen ? <ChevronRight className="w-4 h-4 rotate-180" /> : <Menu className="w-4 h-4" />}
                </motion.div>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </Button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <motion.h2
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {sidebarItems.find(i => i.id === activeTab)?.label}
                </motion.h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activeTab === 'overview' ? 'Real-time manufacturing insights and analytics' :
                   activeTab === 'production' ? 'Monitor and manage production operations' :
                   activeTab === 'machines' ? 'Equipment status and health monitoring' :
                   activeTab === 'energy' ? 'Energy consumption and optimization' :
                   activeTab === 'oee' ? 'Overall Equipment Effectiveness tracking' :
                   activeTab === 'quality' ? 'Quality control and inspection data' :
                   activeTab === 'inventory' ? 'Inventory and supply chain management' :
                   activeTab === 'analytics' ? 'Comprehensive data analysis' :
                   activeTab === 'ai' ? 'AI-powered insights and predictions' :
                   activeTab === 'workforce' ? 'Worker performance and management' :
                   'Customize your dashboard settings'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 transition-all duration-300 focus:scale-105"
                  />
                </div>

                {/* Notifications */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="outline" size="icon" className="relative">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <Bell className="w-5 h-5" />
                          </motion.div>
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
                          >
                            {alerts.length}
                          </motion.span>
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Refresh */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" onClick={handleManualRefresh}>
                    <motion.div
                      animate={{ rotate: 0 }}
                      whileTap={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Fullscreen */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.header>

          {/* Dashboard Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-auto"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 SmartFactory Dashboard. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  />
                  System Operational
                </motion.div>
                <span className="text-sm text-gray-500 dark:text-gray-400">|</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: <span className="font-medium">Just now</span>
                </p>
              </div>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  )
}
