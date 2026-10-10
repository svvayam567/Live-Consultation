import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { ClientExplorer } from '../components/explorer/ClientExplorer';
import { ArrowLeft } from 'lucide-react';

export const ClientExplorerPage: React.FC = () => {
  const { isAdmin, isCustomer } = useAuth();

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

          <div className="w-24" /> {/* Spacer for symmetry */}
        </div>
      </header>

      {/* Main Client Explorer Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-8 flex-1">
        <div className="space-y-1.5 border-b border-[#ECECEC] pb-5">
          <h1 className="text-2xl sm:text-3xl font-display font-semibold text-[#0A0A0A]">
            Client Architecture Explorer
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-2xl font-sans">
            Explore all 37 sacred sanctum projects organized by physical scale, dimensions, and architectural detailing tier.
          </p>
        </div>

        <ClientExplorer selectionMode={false} />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#ECECEC] py-6 text-center text-xs text-[#737373] font-sans">
        <p>© {new Date().getFullYear()} Svvayam. Sacred Temple Architecture.</p>
      </footer>
    </div>
  );
};
