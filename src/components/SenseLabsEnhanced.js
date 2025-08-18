import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, AlertTriangle, CheckCircle, Activity, Shield, Star, Lightbulb, Eye, ThumbsUp, ThumbsDown, Zap, Award, Building, Code, Cpu, ExternalLink  } from 'lucide-react';
import Chatbot from './chatbot/Chatbot';
import { DynamicChartGenerator } from './charts/DynamicChartGenerator';
import { senseData } from '../utils/senseData';

const SenseLabsEnhanced = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeView, setTimeView] = useState('quarterly');

  // Comprehensive data with enhanced analytics
  const quarterlyMetrics = [
    { quarter: 'Q1 2023', arr: 33.8, ebitda: -77.6, customers: 605, grossMargin: 74.5, revenue: 8.38, churn: 15.2, newCustomers: 45, cac: 2.8, ltv: 18.5 },
    { quarter: 'Q2 2023', arr: 35.4, ebitda: -57.3, customers: 648, grossMargin: 75.2, revenue: 8.85, churn: 12.8, newCustomers: 58, cac: 2.6, ltv: 19.2 },
    { quarter: 'Q3 2023', arr: 36.4, ebitda: -43.8, customers: 702, grossMargin: 76.1, revenue: 9.1, churn: 10.5, newCustomers: 67, cac: 2.4, ltv: 19.8 },
    { quarter: 'Q4 2023', arr: 36.8, ebitda: -36.6, customers: 745, grossMargin: 76.8, revenue: 9.2, churn: 9.2, newCustomers: 54, cac: 2.5, ltv: 20.1 },
    { quarter: 'Q1 2024', arr: 37.6, ebitda: -25.8, customers: 798, grossMargin: 74.9, revenue: 9.4, churn: 8.1, newCustomers: 62, cac: 2.3, ltv: 20.8 },
    { quarter: 'Q2 2024', arr: 38.1, ebitda: -25.1, customers: 842, grossMargin: 75.8, revenue: 9.53, churn: 7.3, newCustomers: 55, cac: 2.2, ltv: 21.2 },
    { quarter: 'Q3 2024', arr: 38.6, ebitda: -29.6, customers: 885, grossMargin: 76.2, revenue: 9.65, churn: 6.8, newCustomers: 49, cac: 2.4, ltv: 21.5 },
    { quarter: 'Q4 2024', arr: 39.2, ebitda: -32.0, customers: 901, grossMargin: 75.5, revenue: 9.8, churn: 8.2, newCustomers: 24, cac: 2.8, ltv: 21.1 },
    { quarter: 'Q1 2025', arr: 38.3, ebitda: -25.0, customers: 871, grossMargin: 75.0, revenue: 9.58, churn: 9.5, newCustomers: 18, cac: 3.1, ltv: 20.9 }
  ];

  const yearlyData = [
    { year: '2023', totalRevenue: 35.53, avgEbitda: -53.8, customers: 275, totalNewCustomers: 98, newCustomers: 98, avgChurn: 11.9, marketShare: 8.2, competition: 12 },
    { year: '2024', totalRevenue: 38.38, avgEbitda: -28.1, customers: 318, totalNewCustomers: 87, newCustomers: 87, avgChurn: 7.6, marketShare: 9.1, competition: 15 },
    { year: '2025', totalRevenue: 9.58, avgEbitda: -25.0, customers: 336, totalNewCustomers: 8, newCustomers: 8, avgChurn: 9.5, marketShare: 9.4, competition: 18 }
  ];

  const monthlyRevenueData = [
    // 2023 data with real EBITDA% from JSON
    { month: 'Jan 23', revenue: 2.76, customers: 245, newCustomers: 8, churn: 3.2, ebitda: -78, year: '2023', seasonality: 'Low' },
    { month: 'Feb 23', revenue: 2.78, customers: 248, newCustomers: 6, churn: 2.8, ebitda: -78, year: '2023', seasonality: 'Low' },
    { month: 'Mar 23', revenue: 2.83, customers: 252, newCustomers: 7, churn: 2.5, ebitda: -78, year: '2023', seasonality: 'Medium' },
    { month: 'Apr 23', revenue: 2.86, customers: 258, newCustomers: 9, churn: 2.1, ebitda: -57, year: '2023', seasonality: 'Medium' },
    { month: 'May 23', revenue: 2.88, customers: 265, newCustomers: 11, churn: 1.8, ebitda: -57, year: '2023', seasonality: 'High' },
    { month: 'Jun 23', revenue: 2.86, customers: 271, newCustomers: 8, churn: 1.9, ebitda: -57, year: '2023', seasonality: 'High' },
    { month: 'Jul 23', revenue: 2.87, customers: 276, newCustomers: 7, churn: 2.2, ebitda: -44, year: '2023', seasonality: 'Medium' },
    { month: 'Aug 23', revenue: 2.95, customers: 282, newCustomers: 9, churn: 1.6, ebitda: -44, year: '2023', seasonality: 'High' },
    { month: 'Sep 23', revenue: 3.08, customers: 289, newCustomers: 12, churn: 1.4, ebitda: -44, year: '2023', seasonality: 'High' },
    { month: 'Oct 23', revenue: 3.07, customers: 295, newCustomers: 8, churn: 1.7, ebitda: -37, year: '2023', seasonality: 'High' },
    { month: 'Nov 23', revenue: 3.07, customers: 301, newCustomers: 9, churn: 2.0, ebitda: -37, year: '2023', seasonality: 'Medium' },
    { month: 'Dec 23', revenue: 2.75, customers: 298, newCustomers: 5, churn: 2.8, ebitda: -37, year: '2023', seasonality: 'Low' },
    // 2024 data with real EBITDA% from JSON  
    { month: 'Jan 24', revenue: 2.70, customers: 294, newCustomers: 4, churn: 3.5, ebitda: -26, year: '2024', seasonality: 'Low' },
    { month: 'Feb 24', revenue: 3.12, customers: 297, newCustomers: 7, churn: 2.9, ebitda: -26, year: '2024', seasonality: 'Medium' },
    { month: 'Mar 24', revenue: 3.03, customers: 302, newCustomers: 8, churn: 2.4, ebitda: -26, year: '2024', seasonality: 'High' },
    { month: 'Apr 24', revenue: 2.78, customers: 306, newCustomers: 6, churn: 2.1, ebitda: -25, year: '2024', seasonality: 'Medium' },
    { month: 'May 24', revenue: 3.14, customers: 311, newCustomers: 9, churn: 1.8, ebitda: -25, year: '2024', seasonality: 'High' },
    { month: 'Jun 24', revenue: 3.18, customers: 317, newCustomers: 10, churn: 1.6, ebitda: -25, year: '2024', seasonality: 'High' },
    { month: 'Jul 24', revenue: 3.12, customers: 321, newCustomers: 7, churn: 1.9, ebitda: -30, year: '2024', seasonality: 'High' },
    { month: 'Aug 24', revenue: 3.06, customers: 326, newCustomers: 8, churn: 1.7, ebitda: -30, year: '2024', seasonality: 'High' },
    { month: 'Sep 24', revenue: 3.14, customers: 332, newCustomers: 9, churn: 1.5, ebitda: -30, year: '2024', seasonality: 'High' },
    { month: 'Oct 24', revenue: 2.92, customers: 335, newCustomers: 5, churn: 1.8, ebitda: -32, year: '2024', seasonality: 'Medium' },
    { month: 'Nov 24', revenue: 2.69, customers: 338, newCustomers: 6, churn: 2.2, ebitda: -32, year: '2024', seasonality: 'Low' },
    { month: 'Dec 24', revenue: 3.62, customers: 341, newCustomers: 4, churn: 2.5, ebitda: -32, year: '2024', seasonality: 'High' },
    // 2025 data with real EBITDA% from JSON
    { month: 'Jan 25', revenue: 3.01, customers: 338, newCustomers: 3, churn: 2.8, ebitda: -25, year: '2025', seasonality: 'Medium' },
    { month: 'Feb 25', revenue: 2.79, customers: 335, newCustomers: 2, churn: 3.1, ebitda: -25, year: '2025', seasonality: 'Medium' },
    { month: 'Mar 25', revenue: 2.95, customers: 334, newCustomers: 3, churn: 3.0, ebitda: -25, year: '2025', seasonality: 'High' }
  ];

  // Product evolution with detailed metrics
  const productEvolution = [
    { quarter: 'Q1 2023', engage: 8.2, messaging: 4.1, chatbot: 0.5, platform: 0.8, discover: 0.2, ats: 0, totalCustomers: 605 },
    { quarter: 'Q2 2023', engage: 9.1, messaging: 4.8, chatbot: 1.2, platform: 0.9, discover: 0.3, ats: 0, totalCustomers: 648 },
    { quarter: 'Q3 2023', engage: 10.5, messaging: 5.4, chatbot: 2.1, platform: 1.1, discover: 0.4, ats: 0.1, totalCustomers: 702 },
    { quarter: 'Q4 2023', engage: 11.2, messaging: 6.1, chatbot: 2.8, platform: 1.2, discover: 0.5, ats: 0.3, totalCustomers: 745 },
    { quarter: 'Q1 2024', engage: 12.1, messaging: 6.8, chatbot: 3.4, platform: 1.3, discover: 0.6, ats: 0.5, totalCustomers: 798 },
    { quarter: 'Q2 2024', engage: 12.8, messaging: 7.2, chatbot: 3.9, platform: 1.4, discover: 0.7, ats: 0.7, totalCustomers: 842 },
    { quarter: 'Q3 2024', engage: 13.5, messaging: 7.8, chatbot: 4.5, platform: 1.5, discover: 0.8, ats: 0.9, totalCustomers: 885 },
    { quarter: 'Q4 2024', engage: 14.2, messaging: 8.1, chatbot: 5.1, platform: 1.5, discover: 0.9, ats: 1.0, totalCustomers: 901 },
    { quarter: 'Q1 2025', engage: 15.08, messaging: 8.88, chatbot: 5.51, platform: 1.54, discover: 0.52, ats: 1.09, totalCustomers: 871 }
  ];

  // SWOT Analysis data
  const swotData = {
    strengths: [
      {
        title: 'Market-Leading ARR',
        description: `₹${(parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0) / 10000000).toFixed(1)}Cr ARR with diversified customer base`,
        impact: 'High',
        data: parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0)
      },
      {
        title: 'Low Customer Concentration Risk',
        description: `Top 5 customers represent only ${senseData.customer_concentration?.top_5_customers_arr_percentage || '8%'} of total ARR`,
        impact: 'High',
        data: 8
      },
      {
        title: 'Strong Enterprise Presence',
        description: `${senseData.top_customers?.filter(c => c.segment.includes('Enterprise')).length || 0} enterprise customers demonstrating market leadership`,
        impact: 'High',
        data: senseData.top_customers?.filter(c => c.segment.includes('Enterprise')).length || 0
      },
      {
        title: 'Comprehensive Product Suite',
        description: 'Full-stack talent management platform with multiple product lines',
        impact: 'Medium',
        data: 6
      }
    ],
    weaknesses: [
      {
        title: 'Customer Acquisition Challenges',
        description: 'New customer acquisition has declined from 67 in Q3 2023 to 18 in Q1 2025',
        impact: 'High',
        data: 18
      },
      {
        title: 'Profitability Path',
        description: 'Still achieving profitability with negative EBITDA, though improving trend',
        impact: 'High',
        data: -25
      },
      {
        title: 'Rising Customer Churn',
        description: 'Churn rate increased from 6.8% to 9.5% indicating retention challenges',
        impact: 'Medium',
        data: 9.5
      },
      {
        title: 'Seasonal Revenue Fluctuations',
        description: 'Revenue shows seasonal patterns affecting predictability',
        impact: 'Medium',
        data: 15
      }
    ],
    opportunities: [
      {
        title: 'AI-Powered Automation',
        description: 'Growing demand for AI in talent management creates expansion opportunities',
        impact: 'High',
        data: 45
      },
      {
        title: 'International Expansion',
        description: 'Opportunity to expand beyond current markets with proven solutions',
        impact: 'High',
        data: 35
      },
      {
        title: 'Mid-Market Penetration',
        description: 'Significant opportunity to capture mid-market segment with tailored offerings',
        impact: 'High',
        data: 42
      },
      {
        title: 'Product Integration',
        description: 'Cross-selling opportunities across product suite to increase customer LTV',
        impact: 'Medium',
        data: 28
      }
    ],
    threats: [
      {
        title: 'Increased Competition',
        description: 'Growing number of competitors in talent management space',
        impact: 'High',
        data: 18
      },
      {
        title: 'Economic Uncertainty',
        description: 'Market conditions affecting enterprise spending on HR technology',
        impact: 'Medium',
        data: 35
      },
      {
        title: 'Technology Disruption',
        description: 'Rapid advancement in AI/ML requiring continuous innovation investment',
        impact: 'Medium',
        data: 25
      },
      {
        title: 'Talent Acquisition Costs',
        description: 'Rising costs for acquiring top talent in competitive market',
        impact: 'Medium',
        data: 30
      }
    ]
  };

  // Market Research & Competitive Analysis
  const marketResearch = {
    marketSize: {
      tam: 70.6, // Total Addressable Market in $B (HR Tech by 2034)
      sam: 25.4, // Serviceable Addressable Market in $B (Talent Management by 2032)
      som: 4.2  // Serviceable Obtainable Market in $B
    },
    competitors: [
      { 
        name: 'Workday', 
        marketShare: 18.5, 
        strength: 'Enterprise HCM Suite', 
        weakness: 'Complex Implementation', 
        valuation: '70B USD',
        website: 'https://www.workday.com/',
        description: 'Leading cloud-based HCM platform for large enterprises'
      },
      { 
        name: 'Oracle (SuccessFactors)', 
        marketShare: 15.7, 
        strength: 'Enterprise Integration', 
        weakness: 'Legacy UI/UX', 
        valuation: 'Part of Oracle',
        website: 'https://www.oracle.com/human-capital-management/',
        description: 'Comprehensive HCM cloud suite with deep enterprise features'
      },
      { 
        name: 'SAP SuccessFactors', 
        marketShare: 12.3, 
        strength: 'ERP Integration', 
        weakness: 'Complexity', 
        valuation: 'Part of SAP',
        website: 'https://www.sap.com/products/hcm.html',
        description: 'Enterprise talent management integrated with SAP ecosystem'
      },
      { 
        name: 'BambooHR', 
        marketShare: 10.8, 
        strength: 'SMB Focus & Usability', 
        weakness: 'Limited Enterprise Features', 
        valuation: '2.5B USD',
        website: 'https://www.bamboohr.com/',
        description: 'Popular HR platform for small to medium businesses'
      },
      { 
        name: 'ADP', 
        marketShare: 9.4, 
        strength: 'Payroll Integration', 
        weakness: 'Talent Management Secondary', 
        valuation: '95B USD',
        website: 'https://www.adp.com/',
        description: 'Payroll leader expanding into comprehensive HR technology'
      },
      { 
        name: 'Cornerstone OnDemand', 
        marketShare: 8.2, 
        strength: 'Learning & Development', 
        weakness: 'Market Position Decline', 
        valuation: '5.2B USD (acquired)',
        website: 'https://www.cornerstoneondemand.com/',
        description: 'Talent management platform with strong L&D capabilities'
      },
      { 
        name: 'UKG (Ultimate Kronos)', 
        marketShare: 7.6, 
        strength: 'Workforce Management', 
        weakness: 'Post-Merger Integration', 
        valuation: '22B USD',
        website: 'https://www.ukg.com/',
        description: 'Unified HR, payroll, and workforce management platform'
      },
      { 
        name: 'Others (iCIMS, Greenhouse, Lever, Ceridian)', 
        marketShare: 17.5, 
        strength: 'Specialized Solutions', 
        weakness: 'Limited Full-Suite Offering', 
        valuation: 'Various',
        website: 'https://www.icims.com/, https://www.greenhouse.io/, https://www.lever.co/, https://www.ceridian.com/',
        description: 'Specialized talent acquisition and HR technology providers'
      }
    ],
    trends: [
      { 
        trend: 'AI-Powered Talent Intelligence', 
        growth: 35.2, 
        impact: 'High', 
        description: 'AI-driven skills matching and predictive analytics for talent decisions'
      },
      { 
        trend: 'Employee Experience Platforms', 
        growth: 28.7, 
        impact: 'High', 
        description: 'Unified platforms focusing on end-to-end employee journey'
      },
      { 
        trend: 'Remote Work Management', 
        growth: 31.5, 
        impact: 'High', 
        description: 'Tools for managing distributed and hybrid workforces'
      },
      { 
        trend: 'Skills-Based Hiring', 
        growth: 22.1, 
        impact: 'Medium', 
        description: 'Shift from degree-based to competency-based talent evaluation'
      },
      { 
        trend: 'Diversity, Equity & Inclusion (DEI) Tech', 
        growth: 18.9, 
        impact: 'Medium', 
        description: 'Technology solutions to measure and improve workplace diversity'
      }
    ],
    regionalInsights: {
      northAmerica: {
        marketShare: 38.2,
        growthRate: 12.8,
        keyDrivers: ['Digital transformation', 'Labor market competition', 'Compliance requirements'],
        challenges: ['Market saturation', 'High vendor competition']
      },
      europe: {
        marketShare: 28.5,
        growthRate: 11.4,
        keyDrivers: ['GDPR compliance', 'Workforce regulations', 'Digital workplace initiatives'],
        challenges: ['Regulatory complexity', 'Cultural diversity']
      },
      asiaPacific: {
        marketShare: 33.3,
        growthRate: 15.7,
        keyDrivers: ['Rapid digitization', 'Growing workforce', 'Technology adoption'],
        challenges: ['Diverse markets', 'Varying regulations']
      }
    },
    sensePosition: {
  marketFocus: 'Staffing Industry Talent Management',
  currentARR: parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0) / 10000000, // Convert to millions
  customerConcentration: parseFloat(senseData.customer_concentration?.top_5_customers_arr_percentage?.replace('%', '') || 8),
  competitiveAdvantages: [
    'Specialized focus on staffing industry with deep domain expertise',
    'Comprehensive talent engagement platform with messaging integration',
    'AI-powered chatbot capabilities for candidate interaction',
    'Strong enterprise customer base with low concentration risk',
    'Multi-product suite covering full talent lifecycle'
  ],
  marketOpportunities: [
    'AI-powered talent matching and recommendation engines',
    'International staffing market expansion',
    'Small-to-medium staffing agency penetration',
    'Adjacent HR tech verticals (recruitment process outsourcing)',
    'Integration with major ATS and HR platforms'
  ],
  threatAssessment: {
    bigTechCompetition: 'Medium - Limited staffing industry focus',
    marketCommoditization: 'Low - Specialized vertical focus',
    economicSensitivity: 'High - Tied to employment market cycles',
    customerConcentration: 'Low - Top 5 customers only 8% of ARR'
  },
  industryPosition: {
    verticalLeadership: 'Strong in staffing industry',
    productBreadth: 'Comprehensive talent engagement suite',
    customerSatisfaction: 'High retention in enterprise segment',
    innovationIndex: 'Medium - Following industry AI trends'
  }
},
staffingIndustryTrends: [
    {
      trend: 'Gig Economy Growth',
      impact: 'High',
      description: 'Increased demand for flexible workforce management solutions',
      relevanceToSense: 'High - Core market expansion'
    },
    {
      trend: 'Skills-Based Staffing',
      impact: 'High', 
      description: 'Shift from credential-based to competency-based placements',
      relevanceToSense: 'High - AI matching capabilities'
    },
    {
      trend: 'Automated Candidate Screening',
      impact: 'Medium',
      description: 'AI-powered initial screening and qualification processes',
      relevanceToSense: 'Medium - Chatbot integration opportunity'
    },
    {
      trend: 'Real-time Workforce Analytics',
      impact: 'Medium',
      description: 'Demand for instant insights into workforce performance and availability',
      relevanceToSense: 'High - Platform analytics strength'
    }
  ]
  };
  // Utility functions - Updated to use INR as per real data
  const formatCurrency = (value) => `₹${value?.toFixed(1)}M`; // Changed from USD to INR
  const formatPercentage = (value) => `${value?.toFixed(1)}%`;
  const formatINR = (value) => `₹${(value / 10000000)?.toFixed(1)}Cr`; // Convert to Crores like other dashboards
  const formatUSD = (value) => `$${value?.toFixed(1)}M`; // Added USD formatter for reference

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle }) => (
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
        <div className="bg-blue-900 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
      </div>
    </div>
  );

  const SWOTCard = ({ category, items, color }) => (
    <div className={`bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-${color}-500`}>
      <h3 className={`text-lg font-semibold text-${color}-400 mb-4 capitalize flex items-center`}>
        {category === 'strengths' && <ThumbsUp className="w-5 h-5 mr-2" />}
        {category === 'weaknesses' && <ThumbsDown className="w-5 h-5 mr-2" />}
        {category === 'opportunities' && <Star className="w-5 h-5 mr-2" />}
        {category === 'threats' && <AlertTriangle className="w-5 h-5 mr-2" />}
        {category}
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className={`p-4 bg-gray-700 rounded-lg border border-gray-600`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-white">{item.title}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.impact === 'High' ? `bg-${color}-900 text-${color}-300` :
                item.impact === 'Medium' ? `bg-yellow-900 text-yellow-300` :
                `bg-gray-600 text-gray-300`
              }`}>
                {item.impact}
              </span>
            </div>
            <p className="text-sm text-gray-300">{item.description}</p>
            {item.data && (
              <div className="mt-2 text-xs text-gray-400">
                Metric: {typeof item.data === 'number' ? 
                  (item.data > 1000 ? formatINR(item.data) : item.data.toFixed(1)) : 
                  item.data}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Filter data based on timeView
  const getFilteredData = () => {
    switch (timeView) {
      case 'yearly':
        return yearlyData;
      case 'monthly':
        return monthlyRevenueData;
      default:
        return quarterlyMetrics;
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                {/* Sense Labs Logo Placeholder */}
                <div className="w-20 h-16 bg-white rounded-lg flex items-center justify-center mr-3">
                  <img src="/sense_labs.png" alt="Sense Labs" className="w-15 h-10 object-contain" />
                </div>
                Sense Labs
              </h1>
              <p className="text-gray-300">Talent Management Platform Analytics</p>
            </div>
            <div className="flex space-x-4">
              {/* Time View Toggle */}
              <div className="flex bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setTimeView('quarterly')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeView === 'quarterly' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Quarterly
                </button>
                <button
                  onClick={() => setTimeView('yearly')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeView === 'yearly' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setTimeView('monthly')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeView === 'monthly' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-300 hover:text-white'
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
                    activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('financial')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'financial' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Financial
                </button>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'customers' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Customers
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('swot')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'swot' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  SWOT
                </button>
                <button
                  onClick={() => setActiveTab('market')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'market' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Market
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 py-4">
        {/* Key Metrics Row - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total ARR"
            value={formatINR(parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0))}
            change={`${senseData.financial_overview?.data_as_of || 'Q1 2025'}`}
            subtitle="Annual Recurring Revenue"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Top Customer"
            value={senseData.top_customers?.[0]?.customer_name || 'Staffmark'}
            change={`${senseData.top_customers?.[0]?.arr_percentage || '3.53%'} of ARR`}
            subtitle="Largest customer contribution"
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Customer Concentration"
            value={`${senseData.customer_concentration?.top_5_customers_arr_percentage || '8%'}`}
            change="Top 5 customers"
            subtitle="Risk diversification"
            icon={Target}
            trend="up"
          />
          <MetricCard
            title="Market Position"
            value={`${senseData.top_customers?.length || 0}`}
            change="High-value accounts"
            subtitle="Enterprise customers"
            icon={Activity}
            trend="up"
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">ARR & Revenue Trends ({timeView})</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey={timeView === 'yearly' ? 'year' : timeView === 'monthly' ? 'month' : 'quarter'} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      stroke="#9CA3AF" 
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Bar 
                      dataKey={timeView === 'yearly' ? 'totalRevenue' : 'revenue'} 
                      fill="#3B82F6" 
                      name={timeView === 'yearly' ? 'Total Revenue ($M)' : 'Revenue ($M)'} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey={timeView === 'yearly' ? 'avgEbitda' : 'ebitda'} 
                      stroke="#EF4444" 
                      strokeWidth={3} 
                      name={timeView === 'yearly' ? 'Avg EBITDA %' : 'EBITDA %'} 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Customer Growth ({timeView})</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey={timeView === 'yearly' ? 'year' : timeView === 'monthly' ? 'month' : 'quarter'} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      stroke="#9CA3AF" 
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="customers" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.3}
                      name="Total Customers"
                    />
                    <Bar 
                      dataKey="newCustomers" 
                      fill="#F59E0B" 
                      name="New Customers" 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Customer Segment Distribution</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={(() => {
                        const segmentData = {};
                        senseData.top_customers?.forEach(customer => {
                          const segment = customer.segment.replace('Staffing ', '');
                          const value = parseFloat(customer.arr_value);
                          segmentData[segment] = (segmentData[segment] || 0) + value;
                        });
                        return Object.entries(segmentData).map(([name, value], index) => ({
                          name: name,
                          value: Math.round(value / 100000), // Convert to lakhs
                          color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]
                        }));
                      })()}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ₹${value}L`}
                    >
                      {(() => {
                        const segmentData = {};
                        senseData.top_customers?.forEach(customer => {
                          const segment = customer.segment.replace('Staffing ', '');
                          segmentData[segment] = (segmentData[segment] || 0) + 1;
                        });
                        return Object.entries(segmentData).map(([name, count], index) => (
                          <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                        ));
                      })()}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Top Customers by Segment</h4>
                  {senseData.top_customers?.slice(0, 6).map((customer, index) => {
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-red-500'];
                    const arrValue = parseFloat(customer.arr_value);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-3`}></div>
                          <div>
                            <span className="font-medium text-white block">{customer.customer_name}</span>
                            <span className="text-sm text-gray-400">{customer.segment}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-400">{customer.arr_percentage || `${((arrValue / parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 1)) * 100).toFixed(2)}%`}</span>
                          <div className="text-xs text-gray-500">₹{(arrValue / 10000000).toFixed(2)}Cr</div>
                        </div>
                      </div>
                    );
                  }) || []}
                </div>
              </div>
            </div>

            {/* Dynamic Chart Generator */}
            <div className="mb-6">
              <DynamicChartGenerator
                businessData={senseData}
                companyName="Sense Labs"
                theme="dark"
                className="w-full"
              />
            </div>
          </>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Profitability Metrics ({timeView})</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey={timeView === 'yearly' ? 'year' : timeView === 'monthly' ? 'month' : 'quarter'}
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      stroke="#9CA3AF" 
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey={timeView === 'quarterly' ? 'grossMargin' : timeView === 'yearly' ? 'avgEbitda' : 'revenue'}
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.3}
                      name={timeView === 'quarterly' ? 'Gross Margin %' : timeView === 'yearly' ? 'Avg EBITDA %' : 'Revenue ($M)'}
                    />
                    <Line 
                      type="monotone" 
                      dataKey={timeView === 'yearly' ? 'avgEbitda' : 'ebitda'}
                      stroke="#EF4444" 
                      strokeWidth={3} 
                      name={timeView === 'yearly' ? 'Avg EBITDA %' : 'EBITDA %'}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Customer Acquisition Efficiency</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={quarterlyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="quarter" angle={-45} textAnchor="end" height={80} stroke="#9CA3AF" />
                    <YAxis yAxisId="left" stroke="#9CA3AF" />
                    <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="cac" fill="#F59E0B" name="CAC ($K)" />
                    <Line yAxisId="right" type="monotone" dataKey="ltv" stroke="#10B981" strokeWidth={3} name="LTV ($K)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-white mb-4">Customer Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-900 rounded-lg">
                    <span className="font-medium text-gray-300">Total ARR</span>
                    <span className="font-bold text-blue-400">₹{(parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 0) / 10000000).toFixed(1)}Cr</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-900 rounded-lg">
                    <span className="font-medium text-gray-300">Top 5 Concentration</span>
                    <span className="font-bold text-green-400">{senseData.customer_concentration?.top_5_customers_arr_percentage || '8%'}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-900 rounded-lg">
                    <span className="font-medium text-gray-300">Top 10 Concentration</span>
                    <span className="font-bold text-purple-400">{senseData.customer_concentration?.top_10_customers_arr_percentage || '13%'}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-900 rounded-lg">
                    <span className="font-medium text-gray-300">Top 20 Concentration</span>
                    <span className="font-bold text-yellow-400">{senseData.customer_concentration?.top_20_customers_arr_percentage || '21%'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-white mb-4">Top Customer Analysis</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Largest Customer</span>
                    <span className="font-bold text-green-400">{senseData.top_customers?.[0]?.customer_name || 'Staffmark'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">ARR Contribution</span>
                    <span className="font-bold text-blue-400">{senseData.top_customers?.[0]?.arr_percentage || '3.53%'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Segment</span>
                    <span className="font-bold text-purple-400">{senseData.top_customers?.[0]?.segment || 'Staffing Enterprise'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">ARR Value</span>
                    <span className="font-bold text-yellow-400">₹{(parseFloat(senseData.top_customers?.[0]?.arr_value || 0) / 10000000).toFixed(2)}Cr</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-white mb-4">Financial Health Score</h4>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                    <div className="text-3xl font-bold text-white">B+</div>
                    <div className="text-sm text-gray-200">Overall Score</div>
                    <div className="text-xs text-gray-300">Strong fundamentals</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Revenue Growth</span>
                      <span className="text-sm font-semibold text-green-400">8.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Customer Retention</span>
                      <span className="text-sm font-semibold text-blue-400">90.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Market Position</span>
                      <span className="text-sm font-semibold text-purple-400">Strong</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Customer Acquisition vs Churn</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={quarterlyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="quarter" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Bar dataKey="newCustomers" fill="#10B981" name="New Customers" />
                    <Line type="monotone" dataKey="churn" stroke="#EF4444" strokeWidth={3} name="Churn Rate %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Customer Lifetime Value Trends</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={quarterlyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="quarter" stroke="#9CA3AF" />
                    <YAxis yAxisId="left" stroke="#9CA3AF" />
                    <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="ltv" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="LTV ($K)" />
                    <Line yAxisId="right" type="monotone" dataKey="cac" stroke="#F59E0B" strokeWidth={3} name="CAC ($K)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Customer Segments Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Segment Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={(() => {
                          const segmentCounts = {};
                          senseData.top_customers?.forEach(customer => {
                            const segment = customer.segment.replace('Staffing ', '');
                            segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
                          });
                          return Object.entries(segmentCounts).map(([name, value], index) => ({
                            name: `${name} (${value})`,
                            value,
                            color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]
                          }));
                        })()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {(() => {
                          const segmentCounts = {};
                          senseData.top_customers?.forEach(customer => {
                            const segment = customer.segment.replace('Staffing ', '');
                            segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
                          });
                          return Object.entries(segmentCounts).map(([name, value], index) => (
                            <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                          ));
                        })()}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4 col-span-2">
                  <h4 className="font-semibold text-white">Revenue by Segment</h4>
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
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]} mr-3`}></div>
                          <div>
                            <span className="font-medium text-white block">{segment.replace('Staffing ', '')}</span>
                            <span className="text-xs text-gray-400">{data.count} customers • Top: {data.customers[0]}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-400">₹{Math.round(data.totalARR / 100000)}L</div>
                          <div className="text-sm text-gray-400">{((data.totalARR / parseFloat(senseData.financial_overview?.total_arr?.replace(/,/g, '') || 1)) * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Product Evolution & Growth</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={productEvolution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="quarter" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="engage" stroke="#3B82F6" strokeWidth={3} name="Engage" />
                    <Line type="monotone" dataKey="messaging" stroke="#10B981" strokeWidth={3} name="Messaging" />
                    <Line type="monotone" dataKey="chatbot" stroke="#F59E0B" strokeWidth={3} name="Chatbot" />
                    <Line type="monotone" dataKey="ats" stroke="#EF4444" strokeWidth={3} name="ATS" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Product Portfolio Mix (Q1 2025)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Engage', value: 15.08, color: '#3B82F6' },
                        { name: 'Messaging', value: 8.88, color: '#10B981' },
                        { name: 'Chatbot', value: 5.51, color: '#F59E0B' },
                        { name: 'Platform', value: 1.54, color: '#EF4444' },
                        { name: 'ATS', value: 1.09, color: '#8B5CF6' },
                        { name: 'Discover', value: 0.52, color: '#F472B6' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: $${value}M (${(percent * 100).toFixed(1)}%)`}
                    >
                      {[0,1,2,3,4,5].map((index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F472B6'][index]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-400" />
                  Core Products
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-900 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-200">Sense Engage</span>
                      <span className="text-sm font-bold text-blue-400">$15.08M</span>
                    </div>
                    <p className="text-xs text-blue-300 mt-1">Core talent engagement platform</p>
                    <div className="text-xs text-blue-400 mt-2">46.6% of revenue</div>
                  </div>
                  <div className="p-3 bg-green-900 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-200">Messaging Suite</span>
                      <span className="text-sm font-bold text-green-400">$8.88M</span>
                    </div>
                    <p className="text-xs text-green-300 mt-1">Communication platform</p>
                    <div className="text-xs text-green-400 mt-2">27.4% of revenue</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Growth Products
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-900 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-yellow-200">AI Chatbot</span>
                      <span className="text-sm font-bold text-yellow-400">$5.51M</span>
                    </div>
                    <p className="text-xs text-yellow-300 mt-1">AI-powered automation</p>
                    <div className="text-xs text-yellow-400 mt-2">17.0% of revenue • Growing</div>
                  </div>
                  <div className="p-3 bg-red-900 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-red-200">ATS Integration</span>
                      <span className="text-sm font-bold text-red-400">$1.09M</span>
                    </div>
                    <p className="text-xs text-red-300 mt-1">Applicant tracking system</p>
                    <div className="text-xs text-red-400 mt-2">3.4% of revenue • New</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-400" />
                  Product Metrics
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Total Product Revenue</span>
                    <span className="font-bold text-white">$32.62M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Product Lines</span>
                    <span className="font-bold text-white">6 Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Avg Revenue/Product</span>
                    <span className="font-bold text-white">$5.44M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Growth Products</span>
                    <span className="font-bold text-green-400">2 High Growth</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Product Adoption by Customer Segment</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { segment: 'Enterprise', engage: 95, messaging: 87, chatbot: 65, ats: 45, platform: 78 },
                  { segment: 'Mid-Market', engage: 88, messaging: 92, chatbot: 72, ats: 38, platform: 65 },
                  { segment: 'SMB', engage: 76, messaging: 84, chatbot: 58, ats: 22, platform: 45 },
                  { segment: 'Corporate', engage: 91, messaging: 78, chatbot: 82, ats: 67, platform: 71 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="segment" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Bar dataKey="engage" fill="#3B82F6" name="Engage" />
                  <Bar dataKey="messaging" fill="#10B981" name="Messaging" />
                  <Bar dataKey="chatbot" fill="#F59E0B" name="Chatbot" />
                  <Bar dataKey="ats" fill="#EF4444" name="ATS" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* SWOT Analysis Tab */}
        {activeTab === 'swot' && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Strategic SWOT Analysis</h2>
              <p className="text-gray-300">Comprehensive strategic assessment based on business performance and market position</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <SWOTCard category="strengths" items={swotData.strengths} color="green" />
              <SWOTCard category="weaknesses" items={swotData.weaknesses} color="red" />
              <SWOTCard category="opportunities" items={swotData.opportunities} color="blue" />
              <SWOTCard category="threats" items={swotData.threats} color="yellow" />
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Strategic Focus Matrix</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-900 rounded-lg border-2 border-green-500">
                  <h4 className="font-semibold text-green-400 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    SO: Leverage Strengths for Opportunities
                  </h4>
                  <p className="text-sm text-green-300">Use strong ARR base and enterprise presence to capture AI automation opportunities</p>
                </div>
                <div className="p-4 bg-yellow-900 rounded-lg border-2 border-yellow-500">
                  <h4 className="font-semibold text-yellow-400 mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    ST: Use Strengths to Counter Threats
                  </h4>
                  <p className="text-sm text-yellow-300">Leverage diversified customer base to mitigate competitive and economic threats</p>
                </div>
                <div className="p-4 bg-blue-900 rounded-lg border-2 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    WO: Address Weaknesses via Opportunities
                  </h4>
                  <p className="text-sm text-blue-300">Use international expansion and AI opportunities to improve customer acquisition</p>
                </div>
                <div className="p-4 bg-red-900 rounded-lg border-2 border-red-500">
                  <h4 className="font-semibold text-red-400 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    WT: Minimize Weaknesses and Threats
                  </h4>
                  <p className="text-sm text-red-300">Focus on profitability path while defending against competitive pressure</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Market Research Tab */}
        {activeTab === 'market' && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Market Research & Competitive Analysis</h2>
              <p className="text-gray-300">Comprehensive market intelligence and competitive landscape assessment</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Market Size</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-900 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">${marketResearch.marketSize.tam}B</div>
                    <div className="text-sm text-blue-300">Total Addressable Market</div>
                  </div>
                  <div className="text-center p-4 bg-green-900 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">${marketResearch.marketSize.sam}B</div>
                    <div className="text-sm text-green-300">Serviceable Addressable</div>
                  </div>
                  <div className="text-center p-4 bg-purple-900 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">${marketResearch.marketSize.som}B</div>
                    <div className="text-sm text-purple-300">Serviceable Obtainable</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6 col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4">Competitive Landscape</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketResearch.competitors}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="marketShare"
                      label={({ name, marketShare }) => `${name}: ${marketShare}%`}
                    >
                      {marketResearch.competitors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Competitor Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-gray-300">Competitor</th>
                      <th className="text-left p-3 text-gray-300">Market Share</th>
                      <th className="text-left p-3 text-gray-300">Key Strength</th>
                      <th className="text-left p-3 text-gray-300">Key Weakness</th>
                    </tr>
                  </thead>
                  <tbody>
                  {marketResearch.competitors.map((competitor, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="p-3">
                        <div className="group relative">
                          <a 
                            href={competitor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium hover:text-blue-400 hover:underline transition-colors duration-200 cursor-pointer flex items-center gap-1"
                            title={`Visit ${competitor.name} website`}
                          >
                            {competitor.name}
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </a>
                          
                          {/* Tooltip */}
                          <div className="absolute left-0 top-full mt-1 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 w-64 pointer-events-none">
                            {competitor.description}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-blue-400">{competitor.marketShare}%</td>
                      <td className="p-3 text-green-400">{competitor.strength}</td>
                      <td className="p-3 text-red-400">{competitor.weakness}</td>
                      <td className="p-3 text-blue-400">{competitor.valuation}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Market Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketResearch.trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="trend" angle={-45} textAnchor="end" height={100} stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Bar dataKey="growth" fill="#10B981" name="Growth Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Trend Impact Analysis</h3>
                <div className="space-y-4">
                  {marketResearch.trends.map((trend, index) => (
                    <div key={index} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-white">{trend.trend}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          trend.impact === 'High' ? 'bg-red-900 text-red-300' :
                          trend.impact === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-green-900 text-green-300'
                        }`}>
                          {trend.impact} Impact
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Growth Rate</span>
                        <span className="text-sm font-bold text-green-400">{trend.growth}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Strategic Market Position</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <h4 className="font-semibold mb-2 text-white">Current Position</h4>
                  <p className="text-2xl font-bold text-white">Strong</p>
                  <p className="text-sm text-gray-200">Market Leadership in Talent Management</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg">
                  <h4 className="font-semibold mb-2 text-white">Growth Potential</h4>
                  <p className="text-2xl font-bold text-white">High</p>
                  <p className="text-sm text-gray-200">AI and International Expansion</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg">
                  <h4 className="font-semibold mb-2 text-white">Competitive Pressure</h4>
                  <p className="text-2xl font-bold text-white">Medium</p>
                  <p className="text-sm text-gray-200">Manageable with Strong Differentiation</p>
                </div>
              </div>
            </div>
          </>
        )}

        <Chatbot data={senseData} companyName="Sense Labs" />
      </div>
    </div>
  );
};

export default SenseLabsEnhanced;