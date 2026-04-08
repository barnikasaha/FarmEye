import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { motion } from "motion/react"
import { GraduationCap, Lock, User, AlertCircle, Loader2 } from "lucide-react"
import { login } from "../lib/api"

interface LoginPageProps {
  onLogin: (name: string, enrollment: string) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [enrollment, setEnrollment] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    if (enrollment && password) {
      setIsLoading(true)
      try {
        const response = await login(enrollment, password)
        if (response.success) {
          onLogin(response.studentName, response.enrollmentNumber)
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to login. Please check your credentials.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mb-4">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">EduSync</h1>
          <p className="text-muted-foreground">Student Command Center</p>
        </div>

        <Card className="border-none shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              
              {errorMsg && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                   <AlertCircle className="h-4 w-4" />
                   <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Enrollment Number
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="e.g. EDU001" 
                    className="pl-10" 
                    value={enrollment}
                    onChange={(e) => setEnrollment(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full h-11 text-base font-semibold" type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Login to Dashboard"}
              </Button>
              <div className="text-center">
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-8">
          &copy; 2026 EduSync. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}
