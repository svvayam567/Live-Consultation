import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/layout/Header';
import { Logo } from '../components/ui/Logo';
import { VisualExploreModal } from '../components/explorer/VisualExploreModal';
import { PresentationsDocsModal } from '../components/explorer/PresentationsDocsModal';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/ui/StatCard';
import { ArrowRight, Play, FileText, Globe } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isCustomer } = useAuth();
  const [visualModalOpen, setVisualModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);

  const handleStartConsultation = () => {
    if (!user) {
      navigate('/login?role=admin&redirect=/consult');
    } else if (isAdmin) {
      navigate('/consult');
    } else if (isCustomer) {
      navigate('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col antialiased text-[#0A0A0A]">
      {/* Top Application Header: Logo on left, Logout/User on right */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-between">
        <section className="flex flex-col justify-center items-center px-4 pt-12 pb-12 md:pt-20 md:pb-16 max-w-4xl mx-auto text-center space-y-8 flex-1">
          {/* Centered Authentic Vector Logo */}
          <div className="mb-2">
            <Logo className="h-16 sm:h-20 md:h-24 object-contain mx-auto" />
          </div>

          {/* Heading Tagline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-[#0A0A0A] leading-tight">
              Bespoke Sacred Architecture
              <span className="block text-[#5C5C5C] font-normal text-2xl sm:text-3xl md:text-4xl mt-2 font-display italic">
                for Discerning Homes
              </span>
            </h1>
          </div>

          {/* Subtitle / Description */}
          <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-xl mx-auto leading-relaxed font-sans">
            Explore authentic architectural execution journeys — from initial site surveys and precision 2D CAD blueprints to photorealistic 3D renders and master guild craftsmanship.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartConsultation}
              className="w-full sm:w-auto px-8"
            >
              <span>Start Live Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/client-explorer')}
              className="w-full sm:w-auto px-6"
            >
              <span>Open Client Explorer (37 Projects)</span>
            </Button>
          </div>

          {/* Secondary Media Discovery Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-sans">
            <button
              onClick={() => setVisualModalOpen(true)}
              className="px-4 py-2 rounded-full border border-[#ECECEC] hover:border-[#0A0A0A] bg-white text-[#5C5C5C] hover:text-[#0A0A0A] shadow-xs hover:shadow-sm transition-all flex items-center space-x-2 cursor-pointer font-medium"
            >
              <Play className="w-3.5 h-3.5 text-[#0E2A1C]" />
              <span>Visual Explore (6 Videos)</span>
            </button>

            <button
              onClick={() => setDocsModalOpen(true)}
              className="px-4 py-2 rounded-full border border-[#ECECEC] hover:border-[#0A0A0A] bg-white text-[#5C5C5C] hover:text-[#0A0A0A] shadow-xs hover:shadow-sm transition-all flex items-center space-x-2 cursor-pointer font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-[#0E2A1C]" />
              <span>Presentations & Decks (59 Pages)</span>
            </button>
          </div>
        </section>

        {/* Stat Cards Section */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <StatCard
              value="100+"
              label="Client Projects"
              sublabel="India · USA · Canada · UAE · Germany"
            />
            <StatCard
              value="460+"
              label="Segregated Assets"
              sublabel="CAD blueprints, 3D renders & workshop proofs"
            />
            <StatCard
              value="100+"
              label="Sanctum Installations"
              sublabel="Master guild temple architecture executions"
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-[#737373] mt-6 text-center">
            <Globe className="w-3.5 h-3.5 text-[#0E2A1C]" />
            <span>Serving discerning homes globally · Handcrafted in Bengaluru, India</span>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#ECECEC] bg-white/70 backdrop-blur-xs py-6 text-center text-xs text-[#737373] font-sans">
        <p>© {new Date().getFullYear()} Svvayam. Handcrafted in Bengaluru, India. All rights reserved.</p>
      </footer>

      {/* Video Modal */}
      <VisualExploreModal
        isOpen={visualModalOpen}
        onClose={() => setVisualModalOpen(false)}
      />

      {/* Documents Deck Modal */}
      <PresentationsDocsModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />
    </div>
  );
};
