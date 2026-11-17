import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useClientsData } from '../lib/clientsData';
import { Logo } from '../components/ui/Logo';
import { ClientExplorer } from '../components/explorer/ClientExplorer';
import { PresentationsDocsModal } from '../components/explorer/PresentationsDocsModal';
import { ArrowLeft, FileText } from 'lucide-react';

export const ProjectExplorerPage: React.FC = () => {
  const { isAdmin, isCustomer } = useAuth();
  const { clients } = useClientsData();
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const projectCount = clients.length > 0 ? clients.length : 90;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col antialiased text-[#0A0A0A]">
      {/* Minimal Top Header */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#ECECEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            to={isAdmin ? "/showcase" : "/"}
            className="flex items-center space-x-1.5 text-xs font-sans text-[#5C5C5C] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>

          <Link to={isAdmin ? "/showcase" : isCustomer ? "/client" : "/"} className="flex items-center">
            <Logo className="h-7 sm:h-8 object-contain" />
          </Link>

          <button
            id="open-presentations-btn"
            onClick={() => setIsDocsModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#ECECEC] hover:border-[#0A0A0A] bg-white text-xs font-sans text-[#5C5C5C] hover:text-[#0A0A0A] shadow-xs hover:shadow-sm transition-all cursor-pointer font-medium"
            title="View Presentation Decks & Architectural Docs (4 Decks · 74 Pages)"
          >
            <FileText className="w-3.5 h-3.5 text-[#0E2A1C]" />
            <span className="hidden sm:inline">Presentations & Decks</span>
            <span className="sm:hidden">Decks</span>
          </button>
        </div>
      </header>

      {/* Main Project Explorer Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 flex-1">
        <div className="space-y-1.5 border-b border-[#ECECEC] pb-5">
          <h1 className="text-2xl sm:text-3xl font-display font-semibold text-[#0A0A0A]">
            Project Explorer
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-2xl font-sans">
            Explore all {projectCount} sacred sanctum projects organized by design detail tier, structure type, and verified dimensions.
          </p>
        </div>

        <ClientExplorer selectionMode={false} />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#ECECEC] py-6 text-center text-xs text-[#737373] font-sans">
        <p>© {new Date().getFullYear()} Svvayam. Sacred Temple Architecture.</p>
      </footer>

      {/* Presentations & Decks Modal */}
      <PresentationsDocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />
    </div>
  );
};

export const ClientExplorerPage = ProjectExplorerPage;
