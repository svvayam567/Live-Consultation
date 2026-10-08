import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConsultationProvider } from './context/ConsultationContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ProposalViewPage } from './pages/ProposalViewPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ConsultationPage } from './pages/ConsultationPage';
import { ClientExplorerPage } from './pages/ClientExplorerPage';

// Guard for Admin Console (/admin)
const ProtectedAdminRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Verifying admin permissions...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/?role=admin&redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return <AdminDashboard />;
};

// Guard for Live Consultation flow (/consult, /consult/:id)
const ProtectedConsultRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading consultation...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/?role=admin&redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return <ConsultationPage />;
};

// Guard for Architectural Showcase (/showcase)
const ProtectedShowcaseRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading showcase...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/?role=admin&redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return <LandingPage />;
};

// Guard for Client Explorer (/client-explorer)
const ProtectedExplorerRoute: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center text-xs text-neutral-400 font-sans">
        Loading explorer...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/?role=admin&redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return <ClientExplorerPage />;
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

  // If staff/admin opens /client, redirect to their home (/admin)
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <CustomerPortalPage />;
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

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ConsultationProvider>
          <Routes>
            {/* Entry / Default Route: Login Page */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<Navigate to="/" replace />} />

            {/* Showcase Page (Admin landing after login) */}
            <Route path="/showcase" element={<ProtectedShowcaseRoute />} />

            {/* Admin Console (/admin): Consultations table, Customer accounts, Message inbox */}
            <Route path="/admin" element={<ProtectedAdminRoute />} />

            {/* Live Consultation flow (/consult, /consult/:id) */}
            <Route path="/consult" element={<ProtectedConsultRoute />} />
            <Route path="/consult/:id" element={<ProtectedConsultRoute />} />

            {/* Architectural 37 Projects Explorer */}
            <Route path="/client-explorer" element={<ProtectedExplorerRoute />} />

            {/* Customer Sanctum Portal */}
            <Route path="/client" element={<ProtectedClientRoute />} />
            <Route path="/portal" element={<Navigate to="/client" replace />} />

            {/* Proposal View */}
            <Route path="/proposal/:id" element={<ProtectedProposalRoute />} />

            {/* Compatibility Redirects */}
            <Route path="/admin/clients" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/register" element={<Navigate to="/consult" replace />} />
            <Route path="/admin/consultation" element={<Navigate to="/consult" replace />} />
            <Route path="/admin/consultation/:id" element={<Navigate to="/consult" replace />} />

            {/* Catch-all: Redirect to Entry Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ConsultationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
