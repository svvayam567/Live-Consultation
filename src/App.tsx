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
    return <Navigate to="/?role=admin&redirect=/admin" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/client" replace />;
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
    return <Navigate to="/?role=admin&redirect=/consult" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return <ConsultationPage />;
};

// Guard for Client Section (/client)
const ProtectedClientRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading sanctum portal...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/?role=customer&redirect=/client" replace />;
  }

  // If staff/admin opens /client, redirect to their home
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <CustomerPortalPage />;
};

// Guard for Dedicated Client Explorer Page (Staff only)
const ProtectedExplorerRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading explorer...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/?role=admin&redirect=/client-explorer" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return <ClientExplorerPage />;
};

// Guard for Proposal View Page
const ProtectedProposalRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading proposal...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <ProposalViewPage />;
};

// Guard for Presentations & Architectural Showcase (Staff only)
const ProtectedShowcaseRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading showcase...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/?role=admin&redirect=/showcase" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return <LandingPage />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ConsultationProvider>
          <Routes>
            {/* Entry / Default Route: Login Page */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<Navigate to="/" replace />} />

            {/* Client Section (/client) */}
            <Route path="/client" element={<ProtectedClientRoute />} />
            <Route path="/portal" element={<Navigate to="/client" replace />} />

            {/* Admin Console (/admin) */}
            <Route path="/admin" element={<ProtectedAdminRoute />} />

            {/* Live Consultation (Admin only) */}
            <Route path="/consult" element={<ProtectedConsultRoute />} />
            <Route path="/consult/:id" element={<ProtectedConsultRoute />} />

            {/* Dedicated Client Explorer (Admin only) */}
            <Route path="/client-explorer" element={<ProtectedExplorerRoute />} />

            {/* Architectural Showcase & Presentations (Admin only) */}
            <Route path="/showcase" element={<ProtectedShowcaseRoute />} />

            {/* Proposal View */}
            <Route path="/proposal/:id" element={<ProtectedProposalRoute />} />

            {/* Catch-all: Redirect to Entry Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ConsultationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
