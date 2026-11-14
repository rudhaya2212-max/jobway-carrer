import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { MobileHeader } from './components/common/MobileHeader';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { CareerPathsView } from './components/career/CareerPathsView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { CompaniesView } from './components/companies/CompaniesView';
import { CodingWorkspaceView } from './components/workspace/CodingWorkspaceView';
import { SevenDaySprintView } from './components/roadmap/SevenDaySprintView';
import { JobMatcherView } from './components/jobmatch/JobMatcherView';
import { SkillPassportView } from './components/passport/SkillPassportView';
import { CommunityView } from './components/community/CommunityView';
import { AgentCollaborationDrawer } from './components/agents/AgentCollaborationDrawer';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AuthModal } from './components/auth/AuthModal';
import { Compass, Sparkles } from 'lucide-react';

export const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex bg-[#FAF9F6] text-neutral-900 font-sans antialiased">
      
      {/* Desktop Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Compact Header */}
        <MobileHeader />

        {/* Content Feed */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-5 pb-20 lg:pb-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'careers' && <CareerPathsView />}
          {activeTab === 'roadmap' && <RoadmapView />}
          {activeTab === 'companies' && <CompaniesView />}
          {activeTab === 'workspace' && <CodingWorkspaceView />}
          {activeTab === 'sprint' && <SevenDaySprintView />}
          {activeTab === 'assessments' && <SevenDaySprintView />}
          {activeTab === 'community' && <CommunityView />}
          {activeTab === 'jobmatch' && <JobMatcherView />}
          {activeTab === 'passport' && <SkillPassportView />}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />

        {/* Modals & Drawers */}
        <AgentCollaborationDrawer />
        <OnboardingModal />
        <AuthModal />

        {/* Subtle Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-16 lg:bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-950 text-white text-xs shadow-dropdown animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-neutral-300" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

      </div>

    </div>
  );
};

export const App: React.FC = () => {
  return <MainContent />;
};

export default App;
