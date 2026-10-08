import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConsultationProvider } from './context/ConsultationContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ProposalViewPage } from './pages/ProposalViewPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminRegisterPage } from './pages/admin/AdminRegisterPage';
import { AdminConsultationPage } from './pages/admin/AdminConsultationPage';

// Guard for Admin Routes (/admin/clients, /admin/register, /admin/consultation)
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return <>{children}</>;
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

            {/* 3 Distinct Admin Sections with Dedicated Routes */}
            {/* 1. Client Explorer (/admin/clients) */}
            <Route path="/admin" element={<Navigate to="/admin/clients" replace />} />
            <Route
              path="/admin/clients"
              element={
                <ProtectedAdminRoute>
                  <AdminClientsPage />
                </ProtectedAdminRoute>
              }
            />

            {/* 2. Register Customer (/admin/register) */}
            <Route
              path="/admin/register"
              element={
                <ProtectedAdminRoute>
                  <AdminRegisterPage />
                </ProtectedAdminRoute>
              }
            />

            {/* 3. Live Consultation (/admin/consultation) */}
            <Route
              path="/admin/consultation"
              element={
                <ProtectedAdminRoute>
                  <AdminConsultationPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/consultation/:id"
              element={
                <ProtectedAdminRoute>
                  <AdminConsultationPage />
                </ProtectedAdminRoute>
              }
            />

            {/* Legacy & Route Redirections */}
            <Route path="/client-explorer" element={<Navigate to="/admin/clients" replace />} />
            <Route path="/consult" element={<Navigate to="/admin/consultation" replace />} />
            <Route path="/consult/:id" element={<Navigate to="/admin/consultation" replace />} />

            {/* Proposal View */}
            <Route path="/proposal/:id" element={<ProtectedProposalRoute />} />

            {/* Architectural Showcase & Presentations (Admin only) */}
            <Route path="/showcase" element={<ProtectedShowcaseRoute />} />

            {/* Catch-all: Redirect to Entry Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ConsultationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
