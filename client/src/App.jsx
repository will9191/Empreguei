import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientDashboard from './pages/client/ClientDashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';
import ClientRegisterPage from './pages/client/ClientRegisterPage';
import HeroLifes from './components/Hero/HeroLifes';
import CompanyRegisterPage from './pages/company/CompanyRegisterPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  const { currentRole } = useSelector((state) => state.user);

  return (
    <Router>
      <ScrollToTop />
      {currentRole === null && (
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/choose' element={<ChooseUser />} />
          <Route path='/login' element={<LoginPage />} />

          <Route path='/ClientRegister' element={<ClientRegisterPage />} />
          <Route path='/Companyregister' element={<CompanyRegisterPage />} />

          <Route path='*' element={<Navigate to='/' />} />

          <Route path='about' element={<HeroLifes />} />
        </Routes>
      )}

      {currentRole === 'Admin' && (
        <>
          <AdminDashboard />
        </>
      )}

      {currentRole === 'Company' && (
        <>
          <CompanyDashboard />
        </>
      )}

      {currentRole === 'Client' && (
        <>
          <ClientDashboard />
        </>
      )}
    </Router>
  );
}

export default App;
