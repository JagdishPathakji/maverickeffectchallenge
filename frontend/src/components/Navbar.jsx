import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { Shield, LogOut, Sun, Moon, Globe, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage, LANGUAGES } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SurakshaAI</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Improved Language Selector */}
            <div className="relative group flex items-center bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 transition-colors cursor-pointer">
              <Globe size={16} className="text-primary-600 dark:text-primary-400 mr-2" />
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer appearance-none pr-6 z-10 w-full"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.name} value={lang.name} className="text-gray-900 bg-white">
                    {lang.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="text-gray-500 absolute right-3 pointer-events-none" />
            </div>
            
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
                  Hi, {user.full_name || 'User'}
                </span>
                <button onClick={handleLogout} className="flex items-center space-x-1 text-danger-600 hover:text-danger-700 font-medium">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="btn-secondary">Login</Link>
                <Link to="/register" className="btn-primary">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
