import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import Chatbot from './chatbot/Chatbot';
import { senseData } from '../utils/senseData';
<Chatbot senseData={senseData} />
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeView, setTimeView] = useState('quarterly');

  // Complete quarterly data from your JSON
  const quarterlyMetrics = [
    { quarter: 'Q1 2023', arr: 33.8, ebitda: -77.6, customers: 605, grossMargin: 74.5, revenue: 8.38, churn: 15.2, newCustomers: 45 },
    { quarter: 'Q2 2023', arr: 35.4, ebitda: -57.3, customers: 648, grossMargin: 75.2, revenue: 8.85, churn: 12.8, newCustomers: 58 },
    { quarter: 'Q3 2023', arr: 36.4, ebitda: -43.8, customers: 702, grossMargin: 76.1, revenue: 9.1, churn: 10.5, newCustomers: 67 },
    { quarter: 'Q4 2023', arr: 36.8, ebitda: -36.6, customers: 745, grossMargin: 76.8, revenue: 9.2, churn: 9.2, newCustomers: 54 },
    { quarter: 'Q1 2024', arr: 37.6, ebitda: -25.8, customers: 798, grossMargin: 74.9, revenue: 9.4, churn: 8.1, newCustomers: 62 },
    { quarter: 'Q2 2024', arr: 38.1, ebitda: -25.1, customers: 842, grossMargin: 75.8, revenue: 9.53, churn: 7.3, newCustomers: 55 },
    { quarter: 'Q3 2024', arr: 38.6, ebitda: -29.6, customers: 885, grossMargin: 76.2, revenue: 9.65, churn: 6.8, newCustomers: 49 },
    { quarter: 'Q4 2024', arr: 39.2, ebitda: -32.0, customers: 901, grossMargin: 75.5, revenue: 9.8, churn: 8.2, newCustomers: 24 },
    { quarter: 'Q1 2025', arr: 38.3, ebitda: -25.0, customers: 871, grossMargin: 75.0, revenue: 9.58, churn: 9.5, newCustomers: 18 }
  ];

  // Yearly aggregated data
  const yearlyData = [
    { year: '2023', totalRevenue: 35.53, avgEbitda: -53.8, avgCustomers: 675, totalNewCustomers: 224, avgChurn: 11.9 },
    { year: '2024', totalRevenue: 38.38, avgEbitda: -28.1, avgCustomers: 857, totalNewCustomers: 190, avgChurn: 7.6 },
    { year: '2025', totalRevenue: 9.58, avgEbitda: -25.0, avgCustomers: 871, totalNewCustomers: 18, avgChurn: 9.5 }
  ];

  // Monthly revenue data from your JSON
  const monthlyRevenueData = [
    { month: 'Jan 23', revenue: 2.76, year: '2023' },
    { month: 'Feb 23', revenue: 2.78, year: '2023' },
    { month: 'Mar 23', revenue: 2.83, year: '2023' },
    { month: 'Apr 23', revenue: 2.86, year: '2023' },
    { month: 'May 23', revenue: 2.88, year: '2023' },
    { month: 'Jun 23', revenue: 2.86, year: '2023' },
    { month: 'Jul 23', revenue: 2.87, year: '2023' },
    { month: 'Aug 23', revenue: 2.95, year: '2023' },
    { month: 'Sep 23', revenue: 3.08, year: '2023' },
    { month: 'Oct 23', revenue: 3.07, year: '2023' },
    { month: 'Nov 23', revenue: 3.07, year: '2023' },
    { month: 'Dec 23', revenue: 2.75, year: '2023' },
    { month: 'Jan 24', revenue: 2.70, year: '2024' },
    { month: 'Feb 24', revenue: 3.12, year: '2024' },
    { month: 'Mar 24', revenue: 3.03, year: '2024' },
    { month: 'Apr 24', revenue: 2.78, year: '2024' },
    { month: 'May 24', revenue: 3.14, year: '2024' },
    { month: 'Jun 24', revenue: 3.18, year: '2024' },
    { month: 'Jul 24', revenue: 3.12, year: '2024' },
    { month: 'Aug 24', revenue: 3.06, year: '2024' },
    { month: 'Sep 24', revenue: 3.14, year: '2024' },
    { month: 'Oct 24', revenue: 2.92, year: '2024' },
    { month: 'Nov 24', revenue: 2.69, year: '2024' },
    { month: 'Dec 24', revenue: 3.62, year: '2024' },
    { month: 'Jan 25', revenue: 3.01, year: '2025' },
    { month: 'Feb 25', revenue: 2.79, year: '2025' },
    { month: 'Mar 25', revenue: 2.95, year: '2025' }
  ];

  // Segment performance over time
  const segmentPerformance = [
    { quarter: 'Q1 2023', enterprise: 145.2, midMarket: 78.5, smb: 52.3, corporate: 28.1, india: 12.4 },
    { quarter: 'Q2 2023', enterprise: 152.8, midMarket: 82.1, smb: 48.7, corporate: 31.2, india: 11.8 },
    { quarter: 'Q3 2023', enterprise: 168.9, midMarket: 85.4, smb: 45.2, corporate: 33.8, india: 10.9 },
    { quarter: 'Q4 2023', enterprise: 175.3, midMarket: 88.7, smb: 43.1, corporate: 35.2, india: 10.5 },
    { quarter: 'Q1 2024', enterprise: 182.4, midMarket: 91.2, smb: 42.8, corporate: 36.1, india: 10.8 },
    { quarter: 'Q2 2024', enterprise: 188.7, midMarket: 93.5, smb: 41.9, corporate: 36.8, india: 10.6 },
    { quarter: 'Q3 2024', enterprise: 194.2, midMarket: 94.8, smb: 41.2, corporate: 37.1, india: 10.7 },
    { quarter: 'Q4 2024', enterprise: 197.8, midMarket: 95.8, smb: 41.5, corporate: 37.4, india: 10.8 },
    { quarter: 'Q1 2025', enterprise: 199.45, midMarket: 95.13, smb: 41.30, corporate: 37.33, india: 10.70 }
  ];

  // Product evolution over quarters
  const productEvolution = [
    { quarter: 'Q1 2023', engage: 8.2, messaging: 4.1, chatbot: 0.5, platform: 0.8, discover: 0.2, ats: 0 },
    { quarter: 'Q2 2023', engage: 9.1, messaging: 4.8, chatbot: 1.2, platform: 0.9, discover: 0.3, ats: 0 },
    { quarter: 'Q3 2023', engage: 10.5, messaging: 5.4, chatbot: 2.1, platform: 1.1, discover: 0.4, ats: 0.1 },
    { quarter: 'Q4 2023', engage: 11.2, messaging: 6.1, chatbot: 2.8, platform: 1.2, discover: 0.5, ats: 0.3 },
    { quarter: 'Q1 2024', engage: 12.1, messaging: 6.8, chatbot: 3.4, platform: 1.3, discover: 0.6, ats: 0.5 },
    { quarter: 'Q2 2024', engage: 12.8, messaging: 7.2, chatbot: 3.9, platform: 1.4, discover: 0.7, ats: 0.7 },
    { quarter: 'Q3 2024', engage: 13.5, messaging: 7.8, chatbot: 4.5, platform: 1.5, discover: 0.8, ats: 0.9 },
    { quarter: 'Q4 2024', engage: 14.2, messaging: 8.1, chatbot: 5.1, platform: 1.5, discover: 0.9, ats: 1.0 },
    { quarter: 'Q1 2025', engage: 15.08, messaging: 8.88, chatbot: 5.51, platform: 1.54, discover: 0.52, ats: 1.09 }
  ];

  // Customer acquisition and retention trends
  const customerTrends = [
    { quarter: 'Q1 2023', newCustomers: 45, churnedCustomers: 28, netGrowth: 17, retentionRate: 91.2 },
    { quarter: 'Q2 2023', newCustomers: 58, churnedCustomers: 22, netGrowth: 36, retentionRate: 93.1 },
    { quarter: 'Q3 2023', newCustomers: 67, churnedCustomers: 18, netGrowth: 49, retentionRate: 94.8 },
    { quarter: 'Q4 2023', newCustomers: 54, churnedCustomers: 21, netGrowth: 33, retentionRate: 93.5 },
    { quarter: 'Q1 2024', newCustomers: 62, churnedCustomers: 15, netGrowth: 47, retentionRate: 95.2 },
    { quarter: 'Q2 2024', newCustomers: 55, churnedCustomers: 18, netGrowth: 37, retentionRate: 94.1 },
    { quarter: 'Q3 2024', newCustomers: 49, churnedCustomers: 12, netGrowth: 37, retentionRate: 95.8 },
    { quarter: 'Q4 2024', newCustomers: 24, churnedCustomers: 20, netGrowth: 4, retentionRate: 94.2 },
    { quarter: 'Q1 2025', newCustomers: 18, churnedCustomers: 32, netGrowth: -14, retentionRate: 92.1 }
  ];

  // Current segment breakdown
  const segmentData = [
    { name: 'Staffing Enterprise', value: 199.45, color: '#3B82F6' },
    { name: 'Staffing Mid-Market', value: 95.13, color: '#10B981' },
    { name: 'Staffing SMB', value: 41.30, color: '#F59E0B' },
    { name: 'Corporate', value: 37.33, color: '#EF4444' },
    { name: 'Sense India', value: 10.70, color: '#8B5CF6' }
  ];

  // Expense breakdown
  const expenseBreakdown = [
    { category: 'Sales & Marketing', percentage: 65.7, amount: 5.71 },
    { category: 'R&D', percentage: 56.5, amount: 4.91 },
    { category: 'General & Admin', percentage: 17.6, amount: 1.53 },
    { category: 'Cost of Sales', percentage: 25.0, amount: 2.18 }
  ];

  // Utility functions
  const formatCurrency = (value) => `₹${(value * 82 / 10)?.toFixed(1)}Cr`; // Convert USD to INR Crores
  const formatPercentage = (value) => `${value?.toFixed(1)}%`;

  // Key metrics cards component
  const MetricCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  // Insights and recommendations based on actual data
  const insights = [
    {
      type: 'positive',
      title: 'Strong Market Position',
      description: `Total ARR of ₹${parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0).toLocaleString('en-IN')} with ${senseData.top_customers?.length || 0} top-tier customers tracked`,
      recommendation: 'Leverage strong customer base for expansion and cross-selling opportunities'
    },
    {
      type: 'positive',
      title: 'Low Customer Concentration Risk',
      description: `Top 5 customers represent only ${senseData.customer_concentration?.top_5_customers_arr_percentage || '8%'} of ARR, indicating healthy diversification`,
      recommendation: 'Continue building diversified customer portfolio while nurturing key accounts'
    },
    {
      type: 'positive',
      title: 'Enterprise Segment Dominance',
      description: `${senseData.top_customers?.filter(c => c.segment.includes('Enterprise')).length || 0} enterprise customers in top tier, showing strong market positioning`,
      recommendation: 'Focus on enterprise expansion and use success stories for market penetration'
    },
    {
      type: 'neutral',
      title: 'Top Customer Performance',
      description: `${senseData.top_customers?.[0]?.customer_name || 'Staffmark'} leads with ${senseData.top_customers?.[0]?.arr_percentage || '3.53%'} of total ARR`,
      recommendation: 'Develop key account management strategies to grow largest customer relationships'
    },
    {
      type: 'positive',
      title: 'Balanced Risk Profile',
      description: `Top 20 customers represent ${senseData.customer_concentration?.top_20_customers_arr_percentage || '21%'} of ARR, showing good distribution`,
      recommendation: 'Maintain balanced approach between new acquisition and existing customer growth'
    },
    {
      type: 'neutral',
      title: 'Corporate Segment Opportunity',
      description: `${senseData.top_customers?.filter(c => c.segment === 'Corporate').length || 0} corporate customers present expansion potential`,
      recommendation: 'Develop targeted corporate segment strategies to increase market share'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sense Talent Labs</h1>
              <p className="text-gray-600">Executive Dashboard - Q1 2025 Performance</p>
            </div>
            <div className="flex space-x-4">
              {/* Time View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setTimeView('quarterly')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeView === 'quarterly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Quarterly
                </button>
                <button
                  onClick={() => setTimeView('yearly')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeView === 'yearly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setTimeView('monthly')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeView === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Monthly
                </button>
              </div>
              
              {/* Main Navigation */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('financial')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'financial' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Financial
                </button>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'customers' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Customers
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 py-4">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total ARR"
            value={`₹${parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0).toLocaleString('en-IN')} `}
            change="Current ARR"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Top Customer"
            value={senseData.top_customers?.[0]?.customer_name || 'N/A'}
            change={`${senseData.top_customers?.[0]?.arr_percentage || '0%'} of ARR`}
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Customer Concentration"
            value={`${senseData.customer_concentration?.top_5_customers_arr_percentage || '0%'}`}
            change="Top 5 customers"
            icon={Target}
            trend="up"
          />
          <MetricCard
            title="Total Top Customers"
            value={senseData.top_customers?.length || 0}
            change="High-value accounts"
            icon={Activity}
            trend="up"
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Primary Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {/* Combined ARR and EBITDA Trend */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customer Segments</h3>
                <div className="space-y-4">
                  {senseData.top_customers?.slice(0, 6).map((customer, index) => {
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-red-500'];
                    const arrValue = parseFloat(customer.arr_value);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-3`}></div>
                          <div>
                            <span className="font-medium text-gray-900 block">{customer.customer_name}</span>
                            <span className="text-sm text-gray-600">{customer.segment}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600">{customer.arr_percentage || `${((arrValue / parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 1)) * 100).toFixed(2)}%`}</span>
                          <div className="text-xs text-gray-500">₹{arrValue.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    );
                  }) || []}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segment Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={(() => {
                    const segmentData = {};
                    senseData.top_customers?.forEach(customer => {
                      const segment = customer.segment;
                      const value = parseFloat(customer.arr_value);
                      if (segmentData[segment]) {
                        segmentData[segment] += value;
                      } else {
                        segmentData[segment] = value;
                      }
                    });
                    return Object.entries(segmentData).map(([name, value]) => ({
                      name: name.replace('Staffing ', ''),
                      value: Math.round(value / 100000), // Convert to lakhs
                      percentage: ((value / parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 1)) * 100).toFixed(1)
                    })).sort((a, b) => b.value - a.value);
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'value' ? `₹${value}L` : `${value}%`,
                      name === 'value' ? 'ARR (Lakhs)' : 'Share'
                    ]} />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Customer Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segment Analysis</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={(() => {
                      const segmentData = {};
                      senseData.top_customers?.forEach(customer => {
                        const segment = customer.segment;
                        segmentData[segment] = (segmentData[segment] || 0) + 1;
                      });
                      return Object.entries(segmentData).map(([name, count], index) => ({
                        name: name.replace('Staffing ', ''),
                        value: count,
                        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]
                      }));
                    })()}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {(() => {
                      const segmentData = {};
                      senseData.top_customers?.forEach(customer => {
                        const segment = customer.segment;
                        segmentData[segment] = (segmentData[segment] || 0) + 1;
                      });
                      return Object.entries(segmentData).map(([name, count], index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                      ));
                    })()}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <>
            {/* Customer Acquisition Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Acquisition vs Churn Trend</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={customerTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newCustomers" fill="#10B981" name="New Customers" />
                    <Bar dataKey="churnedCustomers" fill="#EF4444" name="Churned Customers" />
                    <Line type="monotone" dataKey="netGrowth" stroke="#3B82F6" strokeWidth={3} name="Net Growth" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Retention Rate Trend</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={customerTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis domain={['dataMin - 2', 'dataMax + 1']} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Retention Rate']} />
                    <Line type="monotone" dataKey="retentionRate" stroke="#10B981" strokeWidth={4} 
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Segment-wise Customer Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Distribution & Retention by Segment</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={(() => {
                        const segmentCounts = {};
                        senseData.top_customers?.forEach(customer => {
                          const segment = customer.segment;
                          segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
                        });
                        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
                        return Object.entries(segmentCounts).map(([name, value], index) => ({
                          name: `${name.replace('Staffing ', '')} (${value})`,
                          value,
                          color: colors[index % colors.length]
                        }));
                      })()}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {(() => {
                        const segmentCounts = {};
                        senseData.top_customers?.forEach(customer => {
                          const segment = customer.segment;
                          segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
                        });
                        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
                        return Object.entries(segmentCounts).map(([name, value], index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ));
                      })()}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Top Customers by Segment</h4>
                  {(() => {
                    const segmentData = {};
                    senseData.top_customers?.forEach(customer => {
                      const segment = customer.segment;
                      if (!segmentData[segment]) {
                        segmentData[segment] = { count: 0, totalARR: 0, customers: [] };
                      }
                      segmentData[segment].count += 1;
                      segmentData[segment].totalARR += parseFloat(customer.arr_value);
                      segmentData[segment].customers.push(customer.customer_name);
                    });
                    
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                    return Object.entries(segmentData).map(([segment, data], index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-3`}></div>
                          <div>
                            <span className="font-medium text-gray-900 block">{segment.replace('Staffing ', '')}</span>
                            <span className="text-xs text-gray-600">{data.count} customers</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">₹{Math.round(data.totalARR / 100000)}L</div>
                          <div className="text-sm text-gray-600">{((data.totalARR / parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 1)) * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* Customer Cohort Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Acquisition Efficiency Over Time</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={quarterlyMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="newCustomers" fill="#10B981" fillOpacity={0.7} name="New Customers" />
                  <Line yAxisId="right" type="monotone" dataKey="customers" stroke="#3B82F6" strokeWidth={3} name="Total Customers" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <>
            {/* Financial Performance Over Time */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profitability Journey (9 Quarters)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={quarterlyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="right" type="monotone" dataKey="grossMargin" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Gross Margin %" />
                    <Line yAxisId="left" type="monotone" dataKey="ebitda" stroke="#EF4444" strokeWidth={3} name="EBITDA %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Structure</h3>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={expenseBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage of Revenue']} />
                        <Bar dataKey="percentage" fill="#3B82F6" />
                    </BarChart>
                    </ResponsiveContainer>
              </div>
            </div>

            {/* Cash Flow and Key Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Customer Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">Total ARR</span>
                    <span className="font-bold text-blue-600">₹{parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">Top 5 Concentration</span>
                    <span className="font-bold text-green-600">{senseData.customer_concentration?.top_5_customers_arr_percentage || '8%'}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-900">Top 10 Concentration</span>
                    <span className="font-bold text-purple-600">{senseData.customer_concentration?.top_10_customers_arr_percentage || '13%'}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-gray-900">Top 20 Concentration</span>
                    <span className="font-bold text-yellow-600">{senseData.customer_concentration?.top_20_customers_arr_percentage || '21%'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Top Customer Analysis</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Largest Customer</span>
                    <span className="font-bold text-green-600">{senseData.top_customers?.[0]?.customer_name || 'Staffmark'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">ARR Contribution</span>
                    <span className="font-bold text-blue-600">{senseData.top_customers?.[0]?.arr_percentage || '3.53%'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Segment</span>
                    <span className="font-bold text-purple-600">{senseData.top_customers?.[0]?.segment || 'Staffing Enterprise'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">ARR Value</span>
                    <span className="font-bold text-yellow-600">₹{parseFloat(senseData.top_customers?.[0]?.arr_value || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Market Segments</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Enterprise Customers</span>
                    <span className="font-bold text-blue-600">{senseData.top_customers?.filter(c => c.segment.includes('Enterprise')).length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Corporate Customers</span>
                    <span className="font-bold text-green-600">{senseData.top_customers?.filter(c => c.segment === 'Corporate').length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Tracked</span>
                    <span className="font-bold text-purple-600">{senseData.top_customers?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Data Period</span>
                    <span className="font-bold text-yellow-600">{senseData.financial_overview?.data_as_of || 'Q1 2025'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Yearly Financial Comparison */}
            {timeView === 'yearly' && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-over-Year Financial Performance</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="totalRevenue" fill="#3B82F6" name="Total Revenue (₹Cr)" />
                    <Line yAxisId="right" type="monotone" dataKey="avgEbitda" stroke="#EF4444" strokeWidth={3} name="Avg EBITDA %" />
                    <Line yAxisId="left" type="monotone" dataKey="avgCustomers" stroke="#10B981" strokeWidth={3} name="Avg Customers" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Financial Trends Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Business Metrics Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹{Math.round(parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0) / 10000000)}Cr</div>
                  <div className="text-sm text-gray-600">Total ARR</div>
                  <div className="text-xs text-gray-500">{senseData.financial_overview?.data_as_of || 'Q1 2025'}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{senseData.customer_concentration?.top_5_customers_arr_percentage || '8%'}</div>
                  <div className="text-sm text-gray-600">Top 5 Concentration</div>
                  <div className="text-xs text-gray-500">Low risk profile</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{senseData.top_customers?.length || 0}</div>
                  <div className="text-sm text-gray-600">Top Customers</div>
                  <div className="text-xs text-gray-500">Tracked accounts</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Strategic Insights Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Strategic Insights & Recommendations</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <div key={index} className={`border-l-4 p-4 rounded-r-lg hover:shadow-md transition-shadow ${
                insight.type === 'positive' ? 'border-green-500 bg-green-50' : 
                insight.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : 
                'border-red-500 bg-red-50'
              }`}>
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    insight.type === 'positive' ? 'bg-green-100' : 
                    insight.type === 'warning' ? 'bg-yellow-100' : 
                    'bg-red-100'
                  }`}>
                    {insight.type === 'positive' ? <CheckCircle className="w-5 h-5 text-green-600" /> : 
                     <AlertTriangle className={`w-5 h-5 ${insight.type === 'warning' ? 'text-yellow-600' : 'text-red-600'}`} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                    <p className="text-sm font-medium text-gray-900">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       {/* Executive Summary Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <h4 className="font-semibold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Revenue Overview
            </h4>
            <div className="space-y-2 text-sm">
            <div>Total ARR: ₹{parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0).toLocaleString('en-IN')}</div>
            <div>Top Customer: {senseData.top_customers?.[0]?.arr_percentage || '3.53%'}</div>
            <div>Currency: {senseData.financial_overview?.currency || 'INR'}</div>
            <div>Period: <span className="font-bold">{senseData.financial_overview?.data_as_of || 'Q1 2025'}</span></div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <h4 className="font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Concentration Risk
            </h4>
            <div className="space-y-2 text-sm">
            <div>Top 5: {senseData.customer_concentration?.top_5_customers_arr_percentage || '8%'}</div>
            <div>Top 10: {senseData.customer_concentration?.top_10_customers_arr_percentage || '13%'}</div>
            <div>Top 20: {senseData.customer_concentration?.top_20_customers_arr_percentage || '21%'}</div>
            <div>Status: <span className="font-bold">Well Diversified</span></div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h4 className="font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Top Segments
            </h4>
            <div className="space-y-2 text-sm">
            <div>Enterprise: {senseData.top_customers?.filter(c => c.segment.includes('Enterprise')).length || 0} customers</div>
            <div>Corporate: {senseData.top_customers?.filter(c => c.segment === 'Corporate').length || 0} customers</div>
            <div>Total Tracked: {senseData.top_customers?.length || 0}</div>
            <div>Status: <span className="font-bold">Enterprise Focused</span></div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white" style={{background: 'linear-gradient(to bottom right, #f97316, #ea580c)'}}>
            <h4 className="font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Market Position
            </h4>
            <div className="space-y-2 text-sm">
            <div>Largest: {senseData.top_customers?.[0]?.customer_name || 'Staffmark'}</div>
            <div>ARR: ₹{parseFloat(senseData.top_customers?.[0]?.arr_value || 0).toLocaleString('en-IN')}</div>
            <div>Share: {senseData.top_customers?.[0]?.arr_percentage || '3.53%'}</div>
            <div>Status: <span className="font-bold">Market Leader</span></div>
            </div>
        </div>
        </div>
        {/* Add Chatbot - should be the last element before closing div */}
        <Chatbot senseData={senseData} />
      </div>
    </div>
  );
};

export default Dashboard;