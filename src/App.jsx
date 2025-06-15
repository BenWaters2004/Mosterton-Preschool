import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ForParents from './pages/ForParents'
import Safeguarding from './pages/Safeguarding'
import OurEnvironment from './pages/OurEnvironment'
import Committee from './pages/Committee'
import TermDates from './pages/TermDates'
import StaffMembers from './pages/StaffMembers'
import FundraisingEvents from './pages/FundraisingEvents'
import Caterpillars from './pages/Caterpillars'
import BusyBees from './pages/busyBees'
import Application from './pages/Application'

import AdminLogin from './pages/Admin/AdminLogin'
import AdminDash from './pages/Admin/AdminDashboard'
import ManageAdmin from './pages/Admin/ManageAdmins'
import AdminHelp from './pages/Admin/AdminHelp'
import AdminEvents from './pages/Admin/AdminEvents'
import AdminTerms from './pages/Admin/AdminTerms'
import CommitteeAdmin from './pages/Admin/AdminCommittee'

function App() {

  return (
    <div>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/ForParents" element={<ForParents />} />
          <Route path="/Safeguarding" element={<Safeguarding />} />
          <Route path='/OurEnvironment' element={<OurEnvironment />} />
          <Route path='/Committee' element={<Committee />} />
          <Route path='/TermDates' element={<TermDates />} />
          <Route path='/StaffMembers' element={<StaffMembers />} />
          <Route path='/FundraisingEvents' element={<FundraisingEvents />} />
          <Route path='/Application' element={<Application />} />
          <Route path='/Caterpillars' element={<Caterpillars />} />
          <Route path='/BusyBees' element={<BusyBees />} />

          <Route path='/Admin' element={<AdminLogin />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/AdminDashboard' element={<AdminDash />} />
          <Route path='/ManageAdmins' element={<ManageAdmin />} />
          <Route path='/AdminHelp' element={<AdminHelp />} />
          <Route path='/AdminEvents' element={<AdminEvents />} />
          <Route path='/AdminTerms' element={<AdminTerms />} />
          <Route path='/AdminCommittee' element={<CommitteeAdmin />} />

          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App