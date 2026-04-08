import * as React from "react"
import { Bell, LogOut, User, Menu, X } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { motion, AnimatePresence } from "motion/react"

interface NavbarProps {
  studentName: string
  enrollment: string
  notifications: any[]
  onLogout: () => void
}

export function Navbar({ studentName, enrollment, notifications, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
            E
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">EduSync</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              {notifications?.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-[10px]">
                  {notifications.length}
                </Badge>
              )}
            </Button>
            
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 rounded-lg border bg-white shadow-lg p-2"
                >
                  <div className="px-3 py-2 border-b mb-2">
                    <span className="font-semibold text-sm">Notifications</span>
                  </div>
                  <div className="space-y-1">
                    {notifications?.length === 0 && <div className="p-3 text-sm text-center text-muted-foreground">No new notifications.</div>}
                    {notifications?.map((n, i) => (
                      <div key={i} className="p-3 hover:bg-muted rounded-md cursor-pointer transition-colors">
                        <p className="text-sm font-medium">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">{n.type} Alert • {n.priority} priority</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-2 text-xs text-primary">View All</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="text-right">
              <p className="text-sm font-medium leading-none">{studentName}</p>
              <p className="text-xs text-muted-foreground mt-1">{enrollment}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
           <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              {notifications?.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-[10px]">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white px-4 py-4 space-y-4 shadow-lg absolute w-full"
          >
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">{studentName}</p>
                <p className="text-sm text-muted-foreground">{enrollment}</p>
              </div>
            </div>
            {isNotificationsOpen && notifications?.length > 0 && (
              <div className="py-2 border-b">
                 <p className="font-bold text-sm mb-2">Notifications</p>
                 {notifications.map((n, i) => (
                    <p key={i} className="text-sm p-1">- {n.message}</p>
                 ))}
              </div>
            )}
            <div className="grid grid-cols-1 gap-2">
              <Button variant="ghost" className="justify-start gap-2">
                <User className="h-4 w-4" /> Profile Settings
              </Button>
              <Button variant="ghost" className="justify-start gap-2 text-destructive" onClick={onLogout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
