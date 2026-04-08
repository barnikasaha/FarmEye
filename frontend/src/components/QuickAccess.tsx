import * as React from "react"
import { 
  Users, 
  CreditCard, 
  FileText, 
  Calendar, 
  Home, 
  Bell, 
  FolderOpen, 
  Zap 
} from "lucide-react"
import { Card } from "./ui/Card"
import { motion } from "motion/react"

const items = [
  { label: "Attendance", icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "Fees", icon: CreditCard, color: "bg-emerald-50 text-emerald-600" },
  { label: "Results", icon: FileText, color: "bg-purple-50 text-purple-600" },
  { label: "Timetable", icon: Calendar, color: "bg-orange-50 text-orange-600" },
  { label: "Hostel", icon: Home, color: "bg-pink-50 text-pink-600" },
  { label: "Notifications", icon: Bell, color: "bg-yellow-50 text-yellow-600" },
  { label: "Documents", icon: FolderOpen, color: "bg-cyan-50 text-cyan-600" },
  { label: "Smart Actions", icon: Zap, color: "bg-indigo-50 text-indigo-600" },
]

export function QuickAccess() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="group flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-md transition-all border-none bg-white">
            <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon className="h-6 w-6" />
            </div>
            <span className="mt-3 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
              {item.label}
            </span>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
