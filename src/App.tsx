import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConsultationProvider } from './context/ConsultationContext';
import { LandingPage } from './pages/LandingPage';
import { ClientExplorerPage } from './pages/ClientExplorerPage';
import { LoginPage } from './pages/LoginPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { ProposalViewPage } from './pages/ProposalViewPage';
import { AdminDashboard } from './pages/AdminDashboard';

// Guard for Admin Dashboard
const ProtectedAdminRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs text-neutral-400">
        Verifying permissions...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login?redirect=/admin" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/consult" replace />;
  }

  return <AdminDashboard />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ConsultationProvider>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Dedicated Client Explorer Page */}
            <Route path="/client-explorer" element={<ClientExplorerPage />} />

            {/* Authentication (Phone OTP) */}
            <Route path="/login" element={<LoginPage />} />

            {/* Live Consultation 8-step flow */}
            <Route path="/consult" element={<ConsultationPage />} />
            <Route path="/consult/:id" element={<ConsultationPage />} />

            {/* Public/Customer Proposal View */}
            <Route path="/proposal/:id" element={<ProposalViewPage />} />

            {/* Admin Console (Protected) */}
            <Route path="/admin" element={<ProtectedAdminRoute />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ConsultationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
