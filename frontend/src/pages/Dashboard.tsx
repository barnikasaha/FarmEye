import * as React from "react"
import { Navbar } from "../components/Navbar"
import { QuickAccess } from "../components/QuickAccess"
import { 
  TimetableCard, 
  AttendanceCard, 
  FeeStatusCard, 
  DeadlinesCard, 
  SmartActionsCard 
} from "../components/DashboardCards"
import { motion } from "motion/react"
import { fetchDashboard, fetchAiAnalysis } from "../lib/api"
import { Loader2 } from "lucide-react"

interface DashboardPageProps {
  studentName: string
  enrollment: string
  onLogout: () => void
}

export function DashboardPage({ studentName, enrollment, onLogout }: DashboardPageProps) {
  const [data, setData] = React.useState<any>(null)
  const [aiData, setAiData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const dashData = await fetchDashboard()
        if (!mounted) return;
        setData(dashData)

        // Then naturally fetch AI analysis
        const analysis = await fetchAiAnalysis(dashData)
        if (!mounted) return;
        setAiData(analysis)

      } catch (err) {
        console.error("Dashboard error:", err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <h2 className="text-xl font-bold animate-pulse text-muted-foreground">Loading your Command Center...</h2>
      </div>
    )
  }

  if (!data) return <div className="text-center mt-20 text-destructive font-bold">Failed to load data. Ensure backend is running.</div>

  const notifications = aiData?.notifications || []
  const insight = aiData?.insight || ""

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar studentName={studentName} enrollment={enrollment} notifications={notifications} onLogout={onLogout} />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <SmartActionsCard notifications={notifications} insight={insight} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {studentName.split(' ')[0]}! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your studies today.</p>
        </motion.div>

        <QuickAccess />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TimetableCard timetable={data.timetable} />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AttendanceCard attendance={data.attendance} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <DeadlinesCard deadlines={data.deadlines} />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FeeStatusCard fees={data.fees} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="font-bold mb-4">Hostel & Mess</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room:</span>
                    <span className="font-medium">{data.hostel?.roomNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mess Status:</span>
                    <span className="font-medium text-primary">{data.hostel?.messStatus || 'N/A'}</span>
                  </div>
                  <div className="pt-2 border-t mt-2">
                     <p className="text-xs font-bold text-muted-foreground mb-2">Complaints</p>
                     {data.hostel?.complaints?.map((c: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-xs mt-1 bg-muted/30 p-1.5 rounded">
                           <span>{c.issue}</span>
                           <span className={c.status === 'Resolved' ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>{c.status}</span>
                        </div>
                     ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  )
}
