import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConsultationProvider } from './context/ConsultationContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ProposalViewPage } from './pages/ProposalViewPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';
import { ClientExplorerPage } from './pages/ClientExplorerPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminRegisterPage } from './pages/admin/AdminRegisterPage';
import { AdminConsultationPage } from './pages/admin/AdminConsultationPage';
import { AdminFloatingChat } from './components/chat/AdminFloatingChat';

// Global floating chat wrapper for Admin / Showcase sessions
const AdminFloatingChatWrapper: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  // Only render when authenticated as admin and on admin/showcase routes
  if (!user || !isAdmin) return null;
  if (location.pathname === '/' || location.pathname.startsWith('/client')) {
    return null;
  }

  return <AdminFloatingChat />;
};

// Guard for Admin Clients Section (/admin/clients)
const ProtectedAdminClientsRoute: React.FC = () => {
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

  return <AdminClientsPage />;
};

// Guard for Admin Register Customer Section (/admin/register)
const ProtectedAdminRegisterRoute: React.FC = () => {
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

  return <AdminRegisterPage />;
};

// Guard for Admin Live Consultation Flow (/admin/consultation, /consult)
const ProtectedAdminConsultationRoute: React.FC = () => {
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

  return <AdminConsultationPage />;
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

  // If staff/admin opens /client, redirect to their home (/admin/clients)
  if (isAdmin) {
    return <Navigate to="/admin/clients" replace />;
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

            {/* Showcase Page */}
            <Route path="/showcase" element={<ProtectedShowcaseRoute />} />

            {/* 3 Dedicated Admin Sections */}
            {/* Section 1: Client Explorer (/admin/clients and /admin) */}
            <Route path="/admin" element={<Navigate to="/admin/clients" replace />} />
            <Route path="/admin/clients" element={<ProtectedAdminClientsRoute />} />

            {/* Section 2: Register Customer (/admin/register) */}
            <Route path="/admin/register" element={<ProtectedAdminRegisterRoute />} />

            {/* Section 3: Live Consultation (/admin/consultation, /consult) */}
            <Route path="/admin/consultation" element={<ProtectedAdminConsultationRoute />} />
            <Route path="/admin/consultation/:id" element={<ProtectedAdminConsultationRoute />} />
            <Route path="/consult" element={<ProtectedAdminConsultationRoute />} />
            <Route path="/consult/:id" element={<ProtectedAdminConsultationRoute />} />

            {/* Architectural 37 Projects Explorer */}
            <Route path="/client-explorer" element={<ProtectedExplorerRoute />} />

            {/* Customer Sanctum Portal */}
            <Route path="/client" element={<ProtectedClientRoute />} />
            <Route path="/portal" element={<Navigate to="/client" replace />} />

            {/* Proposal View */}
            <Route path="/proposal/:id" element={<ProtectedProposalRoute />} />

            {/* Catch-all: Redirect to Entry Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* Floating Admin Chat Inbox */}
          <AdminFloatingChatWrapper />
        </ConsultationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
