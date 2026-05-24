import { useState, useEffect } from 'react';
import { ScreenType, UserProfile } from './types';
import { getUserProfile } from './utils/dbHelper';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TruthTableGenerator from './components/TruthTableGenerator';
import MathCalculator from './components/MathCalculator';
import FormulaSheet from './components/FormulaSheet';
import Examples from './components/Examples';
import SettingsSupport from './components/SettingsSupport';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [selectedExpression, setSelectedExpression] = useState<string | undefined>(undefined);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function initProfile() {
      try {
        // Load default institutional student Alejandro's credentials
        const data = await getUserProfile('local-student-alejandro');
        setProfile(data);
      } catch (err) {
        console.error('Failed to resolve profile', err);
      }
    }
    initProfile();
  }, []);

  const handleSelectExpressionFormDashboard = (expr: string) => {
    setSelectedExpression(expr);
  };

  const handleScreenChange = (screen: ScreenType) => {
    if (screen !== 'truth-tables' && screen !== 'calculator') {
      setSelectedExpression(undefined); // Reset pre-populated formulas
    }
    setCurrentScreen(screen);
  };

  if (!profile) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f9f9fc]">
        <div className="w-12 h-12 border-4 border-[#a80006] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-semibold text-slate-500">Iniciando Consola ClaretLab...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-slate-800" id="logiclab-app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentScreen={currentScreen} 
        onScreenChange={handleScreenChange} 
        userProfile={profile} 
      />

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f9f9fc]" id="logiclab-main-viewport">
        {currentScreen === 'dashboard' && (
          <Dashboard 
            userProfile={profile} 
            onScreenChange={handleScreenChange} 
            onSelectSavedExpression={handleSelectExpressionFormDashboard} 
          />
        )}
        
        {currentScreen === 'truth-tables' && (
          <TruthTableGenerator initialExpression={selectedExpression} />
        )}

        {currentScreen === 'calculator' && (
          <MathCalculator initialExpression={selectedExpression} />
        )}

        {currentScreen === 'formula-sheet' && (
          <FormulaSheet />
        )}
        
        {currentScreen === 'examples' && (
          <div className="h-full overflow-y-auto p-4 md:p-8">
            <Examples />
          </div>
        )}

        {currentScreen === 'settings' && (
          <SettingsSupport 
            initialTab="settings" 
            userProfile={profile} 
            onProfileUpdated={setProfile} 
          />
        )}

        {currentScreen === 'support' && (
          <SettingsSupport 
            initialTab="support" 
            userProfile={profile} 
            onProfileUpdated={setProfile} 
          />
        )}
      </main>
    </div>
  );
}
