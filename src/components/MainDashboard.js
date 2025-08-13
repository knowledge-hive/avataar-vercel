import React, { useState } from 'react';
import { LogOut, Building2 } from 'lucide-react';
import InvestorView from './InvestorView';
import SenseLabsEnhanced from './SenseLabsEnhanced';
import ChaloDashboardEnhanced from './ChaloDashboardEnhanced';
import InterfaceDashboardEnhanced from './InterfaceDashboardEnhanced';
import ElasticrunDashboardEnhanced from './ElasticrunDashboardEnhanced';

const MainDashboard = ({ user, onLogout }) => {
  // Set initial active company based on user role
  const getInitialCompany = () => {
    if (user.role === 'admin') return 'investor-view';
    if (user.role === 'company' && user.company) return user.company;
    return 'investor-view';
  };
  
  const [activeCompany, setActiveCompany] = useState(getInitialCompany());

  const allCompanies = [
    { id: 'investor-view', name: 'Investor View', color: 'gold' },
    { id: 'sense-labs', name: 'Sense Labs', color: 'blue' },
    { id: 'chalo', name: 'Chalo', color: 'green' },
    { id: 'interface', name: 'Interface', color: 'purple' },
    { id: 'elasticrun', name: 'Elasticrun', color: 'teal' }
  ];
  
  // Filter companies based on user role
  const getVisibleCompanies = () => {
    if (user.role === 'admin') {
      return allCompanies; // Admin sees all tabs
    } else if (user.role === 'company' && user.company) {
      // Company users see only their specific company tab
      return allCompanies.filter(company => company.id === user.company);
    }
    return allCompanies; // Fallback
  };
  
  const companies = getVisibleCompanies();

  const getCompanyColorClass = (color, isActive) => {
    const colors = {
      gold: isActive ? 'bg-yellow-600 text-white' : 'text-yellow-400 hover:bg-yellow-900',
      blue: isActive ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-900',
      green: isActive ? 'bg-green-600 text-white' : 'text-green-400 hover:bg-green-900',
      purple: isActive ? 'bg-purple-600 text-white' : 'text-purple-400 hover:bg-purple-900',
      orange: isActive ? 'bg-orange-600 text-white' : 'text-orange-400 hover:bg-orange-900',
      teal: isActive ? 'bg-teal-600 text-white' : 'text-teal-400 hover:bg-teal-900'
    };
    return colors[color] || colors.blue;
  };

  const renderDashboard = () => {
    // Check if user has access to the selected company
    if (user.role === 'company' && user.company && activeCompany !== user.company) {
      // If company user tries to access unauthorized dashboard, redirect to their company
      setActiveCompany(user.company);
      return null;
    }
    
    switch (activeCompany) {
      case 'investor-view':
        return user.role === 'admin' ? <InvestorView /> : <div className="flex items-center justify-center h-64 text-gray-500">Access Restricted</div>;
      case 'sense-labs':
        return <SenseLabsEnhanced />;
      case 'chalo':
        return <ChaloDashboardEnhanced />;
      case 'interface':
        return <InterfaceDashboardEnhanced />;
      case 'elasticrun':
        return <ElasticrunDashboardEnhanced />;
      default:
        return user.role === 'admin' ? <InvestorView /> : <div className="flex items-center justify-center h-64 text-gray-500">Access Restricted</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header with Company Tabs and User Info */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                {/* Logo Placeholder */}
                <div className="w-30 h-25 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center mr-3">
                  <img src="/gika.png" alt="Gika" className="w-20 h-16 rounded-lg" />
                </div>
                <h1 className="text-2xl font-bold text-white">Portfolio Dashboard</h1>
              </div>
              
              {/* Company Tabs */}
              <div className="flex space-x-2">
                {companies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => setActiveCompany(company.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      getCompanyColorClass(company.color, activeCompany === company.id)
                    }`}
                  >
                    {company.name}
                  </button>
                ))}
                {user.role === 'company' && (
                  <div className="ml-4 px-3 py-2 bg-gray-700 rounded-lg">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Company Access</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-300">@{user.username}</p>
                {user.role === 'admin' && (
                  <span className="inline-block px-2 py-1 text-xs bg-yellow-600 text-white rounded-full mt-1">Admin</span>
                )}
                {user.role === 'company' && (
                  <span className="inline-block px-2 py-1 text-xs bg-blue-600 text-white rounded-full mt-1">Company</span>
                )}
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-900 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="w-full">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default MainDashboard;