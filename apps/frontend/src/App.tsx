import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './layout/Layout';
import { DashboardView } from './pages/dashboard/Dashboard';
import { LightingControl } from './pages/lighting/Lighting';
import { TemperatureControl } from './pages/temperature/Temperature';
import { AccessControl } from './pages/access/AccessControl';
import { ReportsModule } from './pages/report/Report';

export const App = () => {
  return (
    <div className='w-screen h-screen overflow-y-auto'>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout></Layout>}>
            <Route element={<DashboardView />} path='/'></Route>
            <Route element={<LightingControl />} path='/luces'></Route>
            <Route element={<TemperatureControl />} path='/temperatura'></Route>
            <Route element={<AccessControl />} path='/acceso'></Route>
            <Route element={<ReportsModule />} path='/reportes'></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
