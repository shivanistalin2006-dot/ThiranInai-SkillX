import React from 'react';
import { SkillXProvider, useSkillX } from './context/SkillXContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import OnboardingModal from './components/modals/OnboardingModal';
import SwapModal from './components/modals/SwapModal';
import AddSkillModal from './components/modals/AddSkillModal';
import ThemeModal from './components/modals/ThemeModal';

// Pages
import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import AIMatchPage from './pages/AIMatchPage';
import SkillPassportPage from './pages/SkillPassportPage';
import CreditsPage from './pages/CreditsPage';
import DashboardPage from './pages/DashboardPage';
import MySkillsPage from './pages/MySkillsPage';
import SwapsPage from './pages/SwapsPage';
import MessagingPage from './pages/MessagingPage';
import CommunityPage from './pages/CommunityPage';
import PricingPage from './pages/PricingPage';
import SettingsPage from './pages/SettingsPage';

function MainContent() {
  const { currentView, isThemeModalOpen, setIsThemeModalOpen } = useSkillX();

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'discover':
        return <DiscoverPage />;
      case 'aimatch':
        return <AIMatchPage />;
      case 'passport':
        return <SkillPassportPage />;
      case 'credits':
        return <CreditsPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'myskills':
        return <MySkillsPage />;
      case 'swaps':
        return <SwapsPage />;
      case 'messaging':
        return <MessagingPage />;
      case 'community':
        return <CommunityPage />;
      case 'pricing':
        return <PricingPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-dark dark:bg-brand-dark light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors">
      <Navbar />
      
      <main className="flex-1">
        {renderView()}
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <OnboardingModal />
      <SwapModal />
      <AddSkillModal />
      <ThemeModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <SkillXProvider>
      <MainContent />
    </SkillXProvider>
  );
}
