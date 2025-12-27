import { useState } from 'react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { LoginModal } from './components/LoginModal';
import { Dashboard } from './sections/Dashboard';
import { ResourceSharing } from './sections/ResourceSharing';
import { MentalHealthSupport } from './sections/MentalHealthSupport';
import { CampusSafety } from './sections/CampusSafety';
import { Profile } from './sections/Profile';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleGetStarted = () => {
    setShowOnboarding(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowOnboarding(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setIsLoggedIn(true);
  };

  const handleLoginComplete = () => {
    setShowLogin(false);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <>
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleLoginClick}
        />
        {showOnboarding && (
          <OnboardingModal
            onClose={() => setShowOnboarding(false)}
            onComplete={handleOnboardingComplete}
            onSwitchToLogin={handleLoginClick}
          />
        )}
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLogin={handleLoginComplete}
            onSwitchToJoin={handleGetStarted}
          />
        )}
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'resources':
      case 'add-resource': // Handle Add Resource
        return <ResourceSharing initialShowAddForm={activeTab === 'add-resource'} />;
      case 'support':
        return <MentalHealthSupport />;
      case 'safety':
        return <CampusSafety />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onNavigate={setActiveTab}
      onLogout={() => setIsLoggedIn(false)}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
