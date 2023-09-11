import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Newsletter from '../pages/newsletter';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import Unsubscribe from '../pages/unsubscribe';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Newsletter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unsubscribe/:email" element={<Unsubscribe />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />} path="/dashboard" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
