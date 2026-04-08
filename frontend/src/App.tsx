import * as React from "react"
import { LoginPage } from "./pages/Login"
import { DashboardPage } from "./pages/Dashboard"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [studentName, setStudentName] = React.useState("")
  const [enrollment, setEnrollment] = React.useState("")

  const handleLogin = (name: string, enrollmentNum: string) => {
    setStudentName(name)
    setEnrollment(enrollmentNum)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setStudentName("")
    setEnrollment("")
  }

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn ? (
        <DashboardPage studentName={studentName} enrollment={enrollment} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}
