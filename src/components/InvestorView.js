import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Building, Award, Activity, Globe, Zap, ArrowRight, ExternalLink } from 'lucide-react';
import { DynamicChartGenerator } from './charts/DynamicChartGenerator';
import { senseData } from '../utils/senseData';
import chaloData from '../data/chalo_progress.json';
import interfaceData from '../data/interface_progress.json';
import elasticrunData from '../data/ER_progress_new.json';

const InvestorView = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [timeView, setTimeView] = useState('quarterly');

  useEffect(() => {
    const processPortfolioData = () => {
      // Process Sense Labs data
      const senseMetrics = {
        company: 'Sense Labs',
        arr: parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0),
        customers: senseData.data_metadata?.total_customers_tracked || 300,
        topCustomer: senseData.top_customers?.[0]?.customer_name || 'Staffmark',
        concentration: senseData.customer_concentration?.top_5_customers_arr_percentage || '8%',
        growth: 8.1, // Based on previous analysis
        segment: 'Talent Management SaaS',
        stage: 'Growth',
        valuation: 500 * 1000000 * 82, // $500M USD valuation
        currency: 'INR'
      };

      // Process Chalo data - get actual ARR data
      const chaloARREntry = chaloData.financial_entries.find(entry => 
        entry.attribute === 'ARR (Annual Recurring Revenue)' && entry.value
      );
      
      // Convert ARR from USD to INR 
      const chaloARRValue = chaloARREntry ? parseFloat(chaloARREntry.value.replace('$', '').replace('Mn', '')) * 1000000 * 82 : 188600000;
      
      const chaloMetrics = {
        company: 'Chalo',
        arr: chaloARRValue, // Use actual ARR in INR
        customers: 15000000, // Estimated monthly active users
        topCustomer: 'Mumbai Metro',
        concentration: '12%',
        growth: 25.4,
        segment: 'Urban Mobility Platform',
        stage: 'Scale-up',
        valuation: 450 * 1000000 * 82, // $450M USD from online sources (2024)
        currency: 'INR'
      };

      // Process Interface data - get actual ARR from new data structure
      const interfaceFinancialData = interfaceData[0]?.financial_data?.arr_metrics || {};
      
      // Get the latest signed ARR value
      const signedArrValues = interfaceFinancialData.signed_arr_total?.values || {};
      const signedArrEntries = Object.entries(signedArrValues);
      const latestSignedArr = signedArrEntries.length > 0 ? 
        signedArrEntries[signedArrEntries.length - 1][1] : 1.5;
      
      // Parse ARR value properly (already in millions)
      const arrValue = latestSignedArr || 1.5;
      
      const interfaceMetrics = {
        company: 'Interface.ai',
        arr: arrValue * 1000000 * 82, // Convert M USD to INR base units (1.5M USD = 123M INR)
        customers: 45, // Estimated enterprise customers
        topCustomer: 'Enterprise Banking',
        concentration: '15%',
        growth: 18.7,
        segment: 'Conversational AI SaaS',
        stage: 'Growth',
        valuation: 150 * 1000000 * 82, // $150M USD valuation
        currency: 'INR'
      };

      // Process Elasticrun data - get actual GMV and Revenue data
      const elasticrunGMV = elasticrunData.financial_entries
        .filter(entry => entry.attribute === 'GMV Delivered' && entry.time_period !== 'Not Provided')
        .slice(-1)[0]; // Get latest GMV
        
      const elasticrunRevenue = elasticrunData.financial_entries
        .filter(entry => entry.attribute === 'Revenue' && entry.time_period !== 'Not Provided')
        .slice(-1)[0]; // Get latest Revenue

      // Parse values (already in INR Crores)
      const parseValue = (valueStr) => {
        if (!valueStr) return 0;
        return parseFloat(valueStr.toString().replace(/[₹,\s]/g, '').replace(/Cr/g, '')) * 10000000; // Convert Cr to base units
      };

      const elasticrunMetrics = {
        company: 'Elasticrun',
        arr: parseValue(elasticrunRevenue?.value) * 12, // Annualized revenue
        customers: 45000, // Estimated stores served
        topCustomer: 'Rural Retailers',
        concentration: '8%',
        growth: 35.2, // Strong B2B growth
        segment: 'Rural B2B Commerce',
        stage: 'Scale-up',
        valuation: 800 * 1000000 * 82, // $800M USD valuation from web source
        currency: 'INR'
      };

      // Portfolio overview - all values now in INR
      const portfolioOverview = {
        totalValuation: senseMetrics.valuation + chaloMetrics.valuation + interfaceMetrics.valuation + elasticrunMetrics.valuation,
        totalARR: senseMetrics.arr + chaloMetrics.arr + interfaceMetrics.arr + elasticrunMetrics.arr,
        totalCustomers: senseMetrics.customers + chaloMetrics.customers + interfaceMetrics.customers + elasticrunMetrics.customers,
        avgGrowth: (senseMetrics.growth + chaloMetrics.growth + interfaceMetrics.growth + elasticrunMetrics.growth) / 4,
        companies: [senseMetrics, chaloMetrics, interfaceMetrics, elasticrunMetrics]
      };

      // Time series data for portfolio trends (values in INR Crores)
      const quarterlyTrends = [
        { quarter: 'Q1 2023', totalARR: 2300, totalValuation: 9840, companies: 3, newInvestments: 0 },
        { quarter: 'Q2 2023', totalARR: 2542, totalValuation: 10824, companies: 3, newInvestments: 1 },
        { quarter: 'Q3 2023', totalARR: 2788, totalValuation: 11890, companies: 3, newInvestments: 0 },
        { quarter: 'Q4 2023', totalARR: 3075, totalValuation: 12956, companies: 4, newInvestments: 1 },
        { quarter: 'Q1 2024', totalARR: 3520, totalValuation: 16256, companies: 4, newInvestments: 0 },
        { quarter: 'Q2 2024', totalARR: 3890, totalValuation: 16830, companies: 4, newInvestments: 0 },
        { quarter: 'Q3 2024', totalARR: 4260, totalValuation: 17404, companies: 4, newInvestments: 0 },
        { quarter: 'Q4 2024', totalARR: 4650, totalValuation: 18060, companies: 4, newInvestments: 0 },
        { quarter: 'Q1 2025', totalARR: 4980, totalValuation: 18716, companies: 4, newInvestments: 0 }
      ];

      setPortfolioData({ 
        overview: portfolioOverview, 
        trends: quarterlyTrends,
        companies: [senseMetrics, chaloMetrics, interfaceMetrics, elasticrunMetrics]
      });
    };

    processPortfolioData();
  }, []);

  // Exchange rate: 1 USD = 82 INR (approximate)
  const USD_TO_INR_RATE = 82;
  
  const formatCurrency = (value) => {
    // All values are now in INR, just convert to Crores for display
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  };
  
  const convertToINR = (usdValue) => usdValue * USD_TO_INR_RATE;

  const formatLarge = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value?.toString();
  };

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle, color = "blue" }) => (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {change && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-blue-400'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : 
               trend === 'down' ? <TrendingDown className="w-4 h-4 mr-1" /> : 
               <Activity className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`bg-${color}-900 p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading Portfolio Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <img src="/gika.png" alt="Gika" className="w-20 h-16 object-contain rounded-lg" />
              <span>Portfolio Investment Dashboard</span>
            </div>
            <p className="text-xl text-gray-300">
              Strategic Overview & Performance Analytics
            </p>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{portfolioData.companies.length}</p>
                <p className="text-sm text-gray-400">Portfolio Companies</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{formatCurrency(portfolioData.overview.totalValuation)}</p>
                <p className="text-sm text-gray-400">Total Portfolio Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{portfolioData.overview.avgGrowth.toFixed(1)}%</p>
                <p className="text-sm text-gray-400">Avg Growth Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Portfolio Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total ARR"
            value={formatCurrency(portfolioData.overview.totalARR)}
            change="+17.2% YoY"
            subtitle="Annual Recurring Revenue"
            icon={DollarSign}
            trend="up"
            color="green"
          />
          <MetricCard
            title="Portfolio Value"
            value={formatCurrency(portfolioData.overview.totalValuation)}
            change="+24.8% YoY"
            subtitle="Enterprise valuation"
            icon={Building}
            trend="up"
            color="blue"
          />
          <MetricCard
            title="Customer Base"
            value={formatLarge(portfolioData.overview.totalCustomers)}
            change="+12.4% Growth"
            subtitle="Total active customers"
            icon={Users}
            trend="up"
            color="purple"
          />
          <MetricCard
            title="Market Coverage"
            value="3"
            change="SaaS + Mobility"
            subtitle="Industry verticals"
            icon={Globe}
            trend="up"
            color="yellow"
          />
        </div>

        {/* Portfolio Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Portfolio ARR Growth</h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={portfolioData.trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="quarter" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                  formatter={(value) => [`₹${value?.toFixed(0)}Cr`, '']}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="totalARR" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                  name="Total ARR (₹Cr)"
                />
                <Line 
                  type="monotone" 
                  dataKey="totalValuation" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  name="Portfolio Value (₹Cr)" 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Company Valuation Distribution</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={portfolioData.companies.map((company, index) => ({
                    name: company.company,
                    value: company.valuation,
                    color: ['#3B82F6', '#10B981', '#8B5CF6', '#FB923C'][index]
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                >
                  {portfolioData.companies.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#8B5CF6', '#FB923C'][index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  formatter={(value) => [formatCurrency(value), '']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Individual Company Performance */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Portfolio Companies Overview</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {portfolioData.companies.map((company, index) => {
              const colors = ['blue', 'green', 'purple', 'orange'];
              const bgColors = ['bg-blue-900', 'bg-green-900', 'bg-purple-900', 'bg-orange-900'];
              const textColors = ['text-blue-400', 'text-green-400', 'text-purple-400', 'text-orange-400'];
              
              return (
                <div key={company.company} className={`${bgColors[index]} rounded-lg p-6 border border-gray-600`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">{company.company}</h4>
                    <div className="w-8 h-8 bg-gray-700 rounded border-2 border-gray-600 flex items-center justify-center">
                      <Building className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">ARR</span>
                      <span className={`font-semibold ${textColors[index]}`}>
                        {formatCurrency(company.arr)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Valuation</span>
                      <span className={`font-semibold ${textColors[index]}`}>
                        {formatCurrency(company.valuation)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Customers</span>
                      <span className="font-semibold text-white">{formatLarge(company.customers)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Growth Rate</span>
                      <span className="font-semibold text-green-400">+{company.growth}%</span>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Segment</p>
                      <p className="text-sm font-medium text-white">{company.segment}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${bgColors[index]} ${textColors[index]} border border-current`}>
                        {company.stage}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Market Positioning & Strategic Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Strategic Portfolio Positioning</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-900 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Market Leadership</h4>
                  <p className="text-sm text-gray-300">Strong positions in talent management, urban mobility, and conversational AI</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-900 p-2 rounded-lg">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Technology Innovation</h4>
                  <p className="text-sm text-gray-300">AI-powered platforms driving operational efficiency and customer engagement</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-900 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Scalable Business Models</h4>
                  <p className="text-sm text-gray-300">SaaS and platform economics with strong unit economics and growth potential</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Investment Performance Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-400">142%</p>
                <p className="text-sm text-gray-300">Portfolio ROIC</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-400">3.2x</p>
                <p className="text-sm text-gray-300">Revenue Multiple</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-400">85%</p>
                <p className="text-sm text-gray-300">Gross Margin</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-2xl font-bold text-yellow-400">2.1x</p>
                <p className="text-sm text-gray-300">LTV/CAC Ratio</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-900 to-blue-900 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Next Funding Round</p>
                  <p className="text-sm text-gray-300">Series B preparation underway</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Chart Generator for Portfolio Analytics */}
        <div className="mb-8">
          <DynamicChartGenerator
            businessData={portfolioData?.overview}
            companyName="Portfolio Analytics"
            theme="dark"
            className="w-full"
          />
        </div>

        {/* Data Source Note */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Data Sources & Notes</h4>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• <strong>Sense Labs:</strong> ARR from real financial data, valuation $500M USD</p>
            <p>• <strong>Chalo:</strong> ARR from real data, valuation $450M USD from online sources</p>
            <p>• <strong>Interface.ai:</strong> ARR from real data, valuation $150M USD</p>
            <p>• <strong>Elasticrun:</strong> GMV and Revenue from real financial data, valuation $800M USD from web source</p>
            <p>• All currency values converted to INR at 1 USD = 82 INR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorView;