import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import FreelanceSearch from './components/FreelanceSearch';
import Applications from './components/Applications';
import Messages from './components/Messages';
import CompanyProfile from './components/CompanyProfile';
import Settings from './components/Settings';
import Onboarding from './components/Onboarding';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false); // Change to true for new companies
  
  // Mock company data
  const company = {
    id: 1,
    name: "GreenTech Solutions",
    initials: "GT",
    industry: "GreenTech",
    email: "contact@greentech-solutions.com",
    logo: null,
    isComplete: true, // Set to false to trigger onboarding
    certifications: ["B-Corp", "ISO 26000", "Label NR"],
    rating: 4.8,
    activeProjects: 12,
    totalBudget: 185000,
    completedCollaborations: 47,
    location: "Paris, France",
    size: "50-100 employés",
    contactPerson: {
      name: "Antoine Da Silva",
      role: "DRH",
      email: "antoine.dasilva@greentech-solutions.com"
    }
  };

  const renderMainContent = () => {
    if (showOnboarding || !company.isComplete) {
      return <Onboarding company={company} setShowOnboarding={setShowOnboarding} />;
    }

    switch(activeTab) {
      case 'dashboard':
        return <Dashboard company={company} setActiveTab={setActiveTab} />;
      case 'projects':
        return <Projects company={company} />;
      case 'freelance-search':
        return <FreelanceSearch company={company} />;
      case 'applications':
        return <Applications company={company} />;
      case 'messages':
        return <Messages company={company} />;
      case 'company-profile':
        return <CompanyProfile company={company} />;
      case 'settings':
        return <Settings company={company} />;
      default:
        return <Dashboard company={company} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} company={company} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header company={company} notifications={5} />
        <main className="flex-1 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default App;