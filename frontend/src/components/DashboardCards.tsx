import * as React from "react"
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar as CalendarIcon,
  Zap,
  BookOpen,
  Bell as BellIcon,
  ArrowRight,
  ChevronRight,
  CreditCard,
  Users
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card"
import { Badge } from "./ui/Badge"
import { Button } from "./ui/Button"
import { motion } from "motion/react"

export function TimetableCard({ timetable }: { timetable: any[] }) {
  const schedule = timetable && timetable.length > 0 ? timetable[0].slots : []

  return (
    <Card className="h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">Today's Timetable</CardTitle>
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.length === 0 ? (
          <p className="text-sm text-muted-foreground">No classes today!</p>
        ) : (
          schedule.map((item: any, i: number) => {
            const isFree = item.subject === 'Free Slot' || item.subject === 'Lunch'
            const isCurrent = i === 1 
            
            return (
              <div 
                key={i} 
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isCurrent ? "bg-primary/5 border-primary shadow-sm" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm font-mono text-muted-foreground w-36">
                    {item.time}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-semibold ${isFree ? "text-green-600" : ""}`}>
                      {item.subject}
                    </span>
                  </div>
                </div>
                {isCurrent && !isFree && (
                  <Badge variant="default" className="animate-pulse">Ongoing</Badge>
                )}
                {isFree && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Free</Badge>
                )}
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

export function AttendanceCard({ attendance }: { attendance: any[] }) {
  const avg = attendance?.length > 0 
    ? (attendance.reduce((acc, curr) => acc + curr.percentage, 0) / attendance.length).toFixed(1) 
    : 0

  return (
    <Card className="h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">Attendance</CardTitle>
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="bg-green-100 text-green-700 text-sm px-3 py-1">{avg}% Overall</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {attendance?.map((s, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{s.subject}</span>
                <span className={`font-bold ${
                  s.percentage < 75 ? "text-destructive" : s.percentage < 85 ? "text-yellow-500" : "text-green-500"
                }`}>
                  {s.percentage}%
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${s.percentage}%` }}
                  className={`h-full rounded-full ${
                    s.percentage < 75 ? "bg-destructive" : s.percentage < 85 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full group">
          Detailed Breakdown <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}

export function FeeStatusCard({ fees }: { fees: any }) {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Fee Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border">
          <div>
            <p className="text-sm text-muted-foreground">Pending Balance</p>
            <p className="text-2xl font-bold mt-1">₹ {fees?.due || 0}</p>
          </div>
          <Badge variant="secondary" className={fees?.status === 'Pending' ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
             {fees?.status || 'Unknown'}
          </Badge>
        </div>
        {fees?.dueDate && (
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Due Date:</span>
            <span className="font-semibold text-destructive">{fees.dueDate}</span>
          </div>
        )}
        <Button className="w-full mt-6 shadow-lg shadow-primary/20">Pay Now</Button>
      </CardContent>
    </Card>
  )
}

export function DeadlinesCard({ deadlines }: { deadlines: any[] }) {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {deadlines?.length === 0 && <p className="text-sm text-muted-foreground">No upcoming deadlines.</p>}
        {deadlines?.map((d, i) => {
          const isUrgent = d.status === 'Pending' 
          return (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-white">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${isUrgent ? "bg-destructive animate-pulse" : "bg-primary"}`} />
                <span className="text-sm font-medium">{d.assignment}</span>
              </div>
              <span className={`text-xs font-bold ${isUrgent ? "text-destructive" : "text-muted-foreground"}`}>
                {d.dueDate}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export function SmartActionsCard({ notifications, insight }: { notifications: any[], insight: string }) {
  const mapIcon = (type: string) => {
    if (type === 'fee') return CreditCard;
    if (type === 'attendance') return Users;
    if (type === 'deadline') return BookOpen;
    return BellIcon;
  }

  const mapColor = (type: string) => {
    if (type === 'fee') return "text-emerald-600 bg-emerald-50";
    if (type === 'attendance') return "text-blue-600 bg-blue-50";
    if (type === 'deadline') return "text-destructive bg-destructive/5";
    return "text-orange-600 bg-orange-50";
  }

  return (
    <Card className="bg-white border-primary/20 shadow-md overflow-hidden">
      <CardHeader className="pb-3 border-b bg-muted/30">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary fill-primary" />
            <CardTitle className="text-lg font-bold">AI Smart Actions</CardTitle>
          </div>
          {insight && <p className="text-sm text-muted-foreground text-primary italic font-medium">"{insight}"</p>}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {(!notifications || notifications.length === 0) && (
             <div className="p-6 text-sm text-muted-foreground">All caught up! No urgent actions.</div>
          )}
          {notifications?.map((action, i) => {
            const Icon = mapIcon(action.type);
            return (
              <button
                key={i}
                className="flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors border-b md:border-r last:border-b-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(3n)]:border-r-0 group"
              >
                <div className={`p-3 rounded-xl ${mapColor(action.type)} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm capitalize">{action.type} Action</span>
                  <span className="text-xs text-muted-foreground">{action.message}</span>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
