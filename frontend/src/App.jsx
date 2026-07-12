import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MessageAnalysis from './pages/MessageAnalysis';
import UrlAnalysis from './pages/UrlAnalysis';
import UpiAnalysis from './pages/UpiAnalysis';
import LoanAnalysis from './pages/LoanAnalysis';
import ScreenshotAnalysis from './pages/ScreenshotAnalysis';
import AudioAnalysis from './pages/AudioAnalysis';
import AIChatPage from './pages/AIChatPage';
import LearningCenter from './pages/LearningCenter';
import HistoryPage from './pages/HistoryPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/analyze/message" element={<ProtectedRoute><MessageAnalysis /></ProtectedRoute>} />
                <Route path="/analyze/url" element={<ProtectedRoute><UrlAnalysis /></ProtectedRoute>} />
                <Route path="/analyze/upi" element={<ProtectedRoute><UpiAnalysis /></ProtectedRoute>} />
                <Route path="/analyze/loan" element={<ProtectedRoute><LoanAnalysis /></ProtectedRoute>} />
                <Route path="/analyze/screenshot" element={<ProtectedRoute><ScreenshotAnalysis /></ProtectedRoute>} />
                <Route path="/analyze/audio" element={<ProtectedRoute><AudioAnalysis /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><AIChatPage /></ProtectedRoute>} />
                <Route path="/learning" element={<ProtectedRoute><LearningCenter /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
