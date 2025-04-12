import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BrainModel } from './components/BrainModel';
import { SymptomInput } from './components/SymptomInput';
import { InsightPanel } from './components/InsightPanel';
import { UploadEEG } from './pages/UploadEEG';
import { DigitalTwin } from './pages/DigitalTwin';
import { SimulateDrug } from './pages/SimulateDrug';
import { History } from './pages/History';
import { UserProfile } from './pages/UserProfile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <UploadEEG />;
      case 'digital-twin':
        return <DigitalTwin />;
      case 'simulate':
        return <SimulateDrug />;
      case 'history':
        return <History />;
      case 'profile':
        return <UserProfile />;
      default:
        return (
          <>
            <h1 className="text-4xl font-bold mb-8">NeuroTwin Dashboard</h1>
            <BrainModel />
            <InsightPanel />
            <SymptomInput />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar onPageChange={setCurrentPage} />
      <Header onProfileClick={() => setCurrentPage('profile')} />
      <main className="pl-28 pr-4 pt-24">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;