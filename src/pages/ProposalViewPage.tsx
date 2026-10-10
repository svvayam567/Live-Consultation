import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Step8Proposal } from '../components/consultation/Step8Proposal';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Printer } from 'lucide-react';

export const ProposalViewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col antialiased text-[#0A0A0A]">
      <div className="no-print">
        <Header />
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-8">
        <div className="no-print mb-6 flex items-center justify-between border-b border-[#ECECEC] pb-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/consult')}
            className="text-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Live Consultation</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => window.print()}
            className="text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            <span>Print / Save PDF</span>
          </Button>
        </div>

        {/* Step 8 Proposal Component */}
        <Step8Proposal />
      </main>
    </div>
  );
};
