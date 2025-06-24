import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./macscpar-app/pages/layout/Layout";
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import ProtectedRoute from "./macscpar-app/pages/components/ProtectedRoute";

import Home from "./macscpar-app/pages/Home";
import Login from "./macscpar-app/auth/Login";
import Register from "./macscpar-app/auth/Register";

import SuperAdmin from "./macscpar-app/pages/dashboards/SuperAdmin";
import AddUser from "./macscpar-app/pages/app/_super-admin/AddUser";
import ViewUsers from "./macscpar-app/pages/app/_super-admin/ViewUsers";

import IGPDashboard from "./macscpar-app/pages/dashboards/IGPDashboard";
import StateOfficer from "./macscpar-app/pages/dashboards/StateOfficer";
import RegionalOfficer from "./macscpar-app/pages/dashboards/RegionalOfficer";
import DistrictOfficer from "./macscpar-app/pages/dashboards/DistrictOfficer";
import LocalOfficer from "./macscpar-app/pages/dashboards/LocalOfficer";
import NGODashboard from "./macscpar-app/pages/dashboards/NGODashboard";

import './App.css';

export default function App() { 

  const { user } = useContext(AppContext);

  return <BrowserRouter>

      <Routes>

        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />

          <Route path="/login" element={ user ? <Home /> : <Login /> } />
          <Route path="/register" element={ user ? <Home /> : <Register /> } />

          <Route path="/super-admin" element={<ProtectedRoute allowedRoles={['super_admin']}><SuperAdmin /></ProtectedRoute>} />
          <Route path="/super-admin/add-user" element={<ProtectedRoute allowedRoles={['super_admin']}><AddUser /></ProtectedRoute>} />
          <Route path="/super-admin/view-users" element={<ProtectedRoute allowedRoles={['super_admin']}><ViewUsers /></ProtectedRoute>} />
          
          <Route path="/igp" element={<ProtectedRoute allowedRoles={['igp']}><IGPDashboard /></ProtectedRoute>} />
          <Route path="/state-officer" element={<ProtectedRoute allowedRoles={['state_officer']}><StateOfficer /></ProtectedRoute>} />
          <Route path="/regional-officer" element={<ProtectedRoute allowedRoles={['regional_officer']}><RegionalOfficer /></ProtectedRoute>} />
          <Route path="/district-officer" element={<ProtectedRoute allowedRoles={['district_officer']}><DistrictOfficer /></ProtectedRoute>} />
          <Route path="/local-officer" element={<ProtectedRoute allowedRoles={['local_officer']}><LocalOfficer /></ProtectedRoute>} />
          <Route path="/ngo-officer" element={<ProtectedRoute allowedRoles={['ngo_officer']}><NGODashboard /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<div>You don't have permission to access this page.</div>} />

        </Route>

      </Routes>

    </BrowserRouter>
}