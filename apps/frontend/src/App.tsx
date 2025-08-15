import { Suspense, } from 'react'
import './App.css'
import { LoadingDashboard } from './pages/loading-status/LoadingStatus'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Toaster richColors  />
        <Suspense fallback={<LoadingDashboard />}>
          <Dashboard />
        </Suspense>
      </div>
    </>
  )
}

export default App
