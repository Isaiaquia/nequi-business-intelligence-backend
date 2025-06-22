
import React, { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import SettingsPage from './pages/SettingsPage';
import BottomNav from './components/layout/BottomNav';
import PageWrapper from './components/layout/PageWrapper';
import { Transaction, StatementSummary } from './types';
import {generateMockTransactions} from './utils/mockData';

// Mock process.env.API_KEY for Gemini API
// In a real environment, this would be set through build process or environment variables
if (!process.env.API_KEY) {
  process.env.API_KEY = "AIzaSyDsnAgbMjoWTCwqlPyuHmRWSNuQivieUeA"; // Updated API Key
  // console.warn("API_KEY for Gemini is not set. Please set process.env.API_KEY.");
}


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<StatementSummary>({
    incomeToday: 0,
    incomeThisWeek: 0,
    incomeThisMonth: 0,
  });

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    // Load initial mock data on login for demonstration
    const initialTransactions = generateMockTransactions(5);
    setTransactions(initialTransactions);
    updateSummary(initialTransactions);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setTransactions([]);
    setSummary({ incomeToday: 0, incomeThisWeek: 0, incomeThisMonth: 0 });
  }, []);

  const updateSummary = (currentTransactions: Transaction[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Monday as start of week
    
    const incomeToday = currentTransactions
      .filter(t => new Date(t.date).toDateString() === today.toDateString() && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const incomeThisWeek = currentTransactions
      .filter(t => new Date(t.date) >= startOfWeek && new Date(t.date) <= now && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const incomeThisMonth = currentTransactions
      .filter(t => new Date(t.date).getFullYear() === now.getFullYear() && new Date(t.date).getMonth() === now.getMonth() && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    setSummary({ incomeToday, incomeThisWeek, incomeThisMonth });
  };


  const addTransactions = useCallback((newTransactions: Transaction[]) => {
    setTransactions(prevTransactions => {
      const allTransactions = [...prevTransactions, ...newTransactions];
      // Simple duplicate prevention based on a hypothetical unique ID or combination of fields
      const uniqueTransactions = Array.from(new Map(allTransactions.map(t => [t.id, t])).values());
      updateSummary(uniqueTransactions);
      return uniqueTransactions;
    });
  }, []);

  const updateTransactionNote = useCallback((transactionId: string, note: string) => {
    setTransactions(prev =>
      prev.map(t => (t.id === transactionId ? { ...t, notes: note } : t))
    );
  }, []);


  if (!isAuthenticated) {
    return <OnboardingPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gris-muy-claro font-inter">
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage summary={summary} addTransactions={addTransactions} />} />
          <Route path="/transactions" element={<TransactionsPage transactions={transactions} updateTransactionNote={updateTransactionNote} />} />
          <Route path="/settings" element={<SettingsPage onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </PageWrapper>
      <BottomNav />
    </div>
  );
};

export default App;
