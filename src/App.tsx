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
import { CustomerPortalPage } from './pages/CustomerPortalPage';

// Guard for Admin Dashboard
const ProtectedAdminRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Verifying admin permissions...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login?role=admin&redirect=/admin" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/portal" replace />;
  }

  return <AdminDashboard />;
};

// Guard for Live Consultation flow (staff only)
const ProtectedConsultRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading consultation...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login?role=admin&redirect=/consult" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/portal" replace />;
  }

  return <ConsultationPage />;
};

// Guard for Customer Portal
const ProtectedPortalRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading client portal...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login?role=customer&redirect=/portal" replace />;
  }

  // If staff/admin opens /portal, redirect to their home
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <CustomerPortalPage />;
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

            {/* Customer Portal (/portal) */}
            <Route path="/portal" element={<ProtectedPortalRoute />} />

            {/* Live Consultation 8-step flow (Admin/Staff only) */}
            <Route path="/consult" element={<ProtectedConsultRoute />} />
            <Route path="/consult/:id" element={<ProtectedConsultRoute />} />

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
