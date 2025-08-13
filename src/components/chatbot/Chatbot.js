import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, BarChart3, Sparkles, TrendingUp, Brain, ChevronRight  } from 'lucide-react';
import { ChartComponent } from '../charts/ChartComponent';
import ReactMarkdown from 'react-markdown';

// const debugChartData = (chartData) => {
//   console.log('Chart Debug:', chartData);
//   return chartData;
// };
// Fixed source citation component
const FormattedMessage = ({ content }) => {
  const processContent = (text) => {
    // Split by lines to handle bullet points properly
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Check if line has source citations
      if (line.includes('[source:') || line.includes('[$')) {
        const parts = line.split(/(\[(?:source:|[$])[^\]]+\])/g);
        
        const processedLine = parts.map((part, partIndex) => {
          if (part.match(/\[(?:source:|[$])[^\]]+\]/)) {
            // Handle both [source: xyz] and [$key.path] formats
            const sourceText = part.replace(/\[(?:source:\s*|[$])([^\]]+)\]/, '$1');
            return (
              <span 
                key={`${lineIndex}-${partIndex}`}
                className="inline-flex items-center px-4 py-2 mx-1 my-1 text-xs font-semibold bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 rounded-lg border border-gray-500 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 cursor-help shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                title={`Data Source: ${sourceText}`}
              >
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium tracking-wide">
                  📊 {sourceText.length > 25 ? `${sourceText.substring(0, 25)}...` : sourceText}
                </span>
                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </span>
            );
          }
          return part;
        });
        
        return (
          <div key={lineIndex} className="mb-2">
            {processedLine}
          </div>
        );
      }
      
      // Regular line without source citations - REMOVED className prop
      return line ? (
        <div key={lineIndex}>
          <ReactMarkdown>{line}</ReactMarkdown>
        </div>
      ) : (
        <br key={lineIndex} />
      );
    });
  };

  return (
    <div className="prose prose-sm max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-ul:text-gray-300 prose-invert prose-a:text-blue-400">
      {processContent(content)}
    </div>
  );
};

const Chatbot = ({ senseData, data, companyName }) => {
  // Use the provided data source (prioritize specific data prop over senseData)
  // Get company color theme
  const getCompanyColors = () => {
    const colorMap = {
      'Sense Labs': {
        primary: 'blue-600',
        secondary: 'blue-400',
        accent: 'blue-500',
        gradient: 'from-blue-600 to-blue-700'
      },
      'Chalo': {
        primary: 'green-600',
        secondary: 'green-400', 
        accent: 'green-500',
        gradient: 'from-green-600 to-green-700'
      },
      'Interface.ai': {
        primary: 'purple-600',
        secondary: 'purple-400',
        accent: 'purple-500', 
        gradient: 'from-purple-600 to-purple-700'
      },
      'Elasticrun': {
        primary: 'teal-600',
        secondary: 'teal-400',
        accent: 'teal-500',
        gradient: 'from-teal-600 to-teal-700'
      }
    };
    return colorMap[companyName] || colorMap['Sense Labs'];
  };
  
  const colors = getCompanyColors();
  const dataSource = data || senseData;
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [showDynamicQuestions, setShowDynamicQuestions] = useState(false);
  // Generate dynamic welcome message based on data type
  const getWelcomeMessage = (data) => {
    // Handle case where data might be undefined
    if (!data) {
      return `👋 **Welcome to ${companyName || 'Business'} AI Assistant!**

I can help you analyze your business data and create visualizations. Here's what I can do:

• 📊 **Create charts** for trends, comparisons, and distributions
• 📈 **Analyze performance** across segments and products
• 💡 **Provide insights** on growth, retention, and profitability
• 🎯 **Answer questions** about your specific metrics

Try asking me about your key metrics and performance indicators!`;
    }
    let detectedCompanyName = 'Business';
    let specificCapabilities = [];

    // Detect company type based on data structure
    if (data.financial_entries) {
      const attributes = [...new Set(data.financial_entries.map(entry => entry.attribute))];
      
      if (attributes.includes('Passengers (in lakhs)')) {
        detectedCompanyName = 'Chalo';
        specificCapabilities = [
          '🚌 **Transportation Metrics** - Passenger volumes and routes',
          '💰 **Revenue Analysis** - Gross contribution and growth trends',
          '📍 **Operational Insights** - City-wise performance and efficiency'
        ];
      } else if (attributes.includes('GMV Delivered')) {
        detectedCompanyName = 'Elasticrun';
        specificCapabilities = [
          '🏪 **B2B Commerce** - GMV, revenue, and marketplace metrics',
          '🚚 **Distribution Network** - Station performance and coverage',
          '🌾 **Rural Market** - Rural commerce insights and growth patterns',
          '📊 **Financial Analysis** - EBITDA, profitability, and unit economics'
        ];
      } else if (attributes.includes('Customer Count')) {
        detectedCompanyName = 'Interface.ai';
        specificCapabilities = [
          '🤖 **AI Metrics** - Customer adoption and engagement',
          '📊 **Product Analytics** - Feature usage and performance',
          '🚀 **Growth Analysis** - Customer acquisition and revenue trends'
        ];
      }
    } else if (data.top_customers && data.top_customers.length > 0) {
      detectedCompanyName = 'Sense Labs';
      specificCapabilities = [
        '👥 **Customer Analysis** - ARR, segments, and concentration risk',
        '📈 **Financial Metrics** - Revenue trends and profitability',
        '🎯 **Portfolio Management** - Top customers and growth patterns'
      ];
    }

    const companyEmoji = {
      'Chalo': '🚌',
      'Elasticrun': '🏪',
      'Interface.ai': '🤖',
      'Sense Labs': '👥'
    };
    
    const emoji = companyEmoji[detectedCompanyName] || '📊';
    
    return `${emoji} **Welcome to ${detectedCompanyName} Intelligence Hub!**\n\n🎯 **Your AI-Powered Business Analyst** is ready to transform your data into actionable insights.\n\n## 🚀 **Core Capabilities:**\n• **📊 Smart Visualizations** - Interactive charts, trends, and comparisons\n• **📈 Performance Analytics** - Deep-dive into KPIs and growth metrics\n• **💡 Strategic Insights** - Data-driven recommendations and forecasts\n• **🎯 Custom Analysis** - Tailored reports for your specific needs\n\n## ✨ **${detectedCompanyName} Specialization:**\n${specificCapabilities.join('\n')}\n\n---\n💬 **Ready to explore?** Ask me anything about your business metrics, trends, or performance indicators!`;
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: getWelcomeMessage(dataSource),
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hide preview after 20 seconds or when user interacts
  useEffect(() => {
    if (!isOpen) {
      setShowPreview(true);
      const timer = setTimeout(() => {
        setShowPreview(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  useEffect(() => {
  const retryFailedCharts = () => {
    // Force re-render of any charts that might have failed
    const chartElements = document.querySelectorAll('.chart-wrapper');
    chartElements.forEach(element => {
      if (element.children.length === 0) {
        // Chart failed to render, trigger re-render
        element.style.display = 'none';
        setTimeout(() => {
          element.style.display = 'block';
        }, 100);
      }
    });
  };
  
  // Retry after messages update
  const timer = setTimeout(retryFailedCharts, 500);
  return () => clearTimeout(timer);
}, [messages]);

  const handleOpenChatbot = () => {
    setIsOpen(!isOpen);
    setShowPreview(false);
  };
  
  // const generatePrompt = (userMessage, conversationHistory) => {
  //   return `
  // You are a specialized AI assistant for Sense Labs, a SaaS company providing talent management solutions. You have access to comprehensive business data and should provide insightful analysis.

  // CONTEXT & DATA:
  // You have access to Sense Labs' complete business metrics including:
  // - Current ARR: ${dataSource?.financial_overview?.total_arr || 'N/A'} ${dataSource?.financial_overview?.currency || 'INR'} (as of ${dataSource?.financial_overview?.data_as_of || 'Q1 2025'})
  // - Customer concentration: Top 5 customers represent ${dataSource?.customer_concentration?.top_5_customers_arr_percentage || '8%'} of ARR
  // - Top customers by segment: ${dataSource?.top_customers?.slice(0, 3).map(c => `${c.customer_name} (${c.segment})`).join(', ') || 'Staffmark, PrideStaff, Morson Talent'}
  // - Comprehensive customer data, collections, and receivables aging information
  // - Detailed analysis of accounts receivable and payment patterns
  // CONVERSATION HISTORY:
  // Previous messages in this conversation:
  // ${conversationHistory.map(msg => `${msg.type.toUpperCase()}: ${msg.content}`).join('\n')}

  // Use this context to provide relevant follow-up responses and maintain conversation flow.
  // RESPONSE GUIDELINES:
  // 1. **Always be data-driven**: Reference specific metrics from the context
  // 2. **Provide actionable insights**: Don't just state facts, explain implications
  // 3. **Use professional tone**: You're speaking to executives and stakeholders
  // 4. **Be contextually aware**: Consider business performance trends
  // 5. **Format responses in markdown** with proper headers, bullet points, and emphasis
  // 6. **No duplicate data presentation**: When creating a chart visualization, do NOT include markdown tables or data listings in your text response. Let the chart visualization handle the data display. Focus your text response on insights, analysis, and actionable recommendations only.

  // CHART/VISUALIZATION RULES:
  // When data visualization would enhance your response, include one or more JSON objects at the end with this exact format:

  // \`\`\`json
  // {
  //   "chartRequired": true,
  //   "chartType": "bar|line|pie|scatter",
  //   "title": "Chart Title",
  //   "data": [...],
  //   "config": {...}
  // }
  // \`\`\`

  // For multiple charts, include multiple JSON blocks:
  // \`\`\`json
  // {...chart1...}
  // \`\`\`
  // \`\`\`json
  // {...chart2...}
  // \`\`\`

  // CHART TYPES TO USE:
  // - **bar**: For comparing categories, segment performance, product revenue
  // - **line**: For trends over time, ARR growth, customer acquisition
  // - **pie**: For distribution analysis, market share, customer segments  
  // - **scatter**: For correlation analysis, efficiency metrics

  // MULTIPLE CHARTS GUIDANCE:
  // - You can include multiple charts in a single response for comprehensive analysis
  // - Each chart should focus on a specific aspect of the data
  // - Use different chart types to show different perspectives (e.g., bar for amounts, pie for proportions)
  // - Ensure each chart has a clear, descriptive title
  // - Example: ARR analysis might include both a bar chart of top customers AND a pie chart of segment distribution

  // SAMPLE DATA POINTS YOU CAN REFERENCE:
  // - Current ARR: ${senseData.financial_overview?.total_arr || '38,285,616'} ${senseData.financial_overview?.currency || 'INR'} (as of ${senseData.financial_overview?.data_as_of || 'Q1 2025'})
  // - Top customer: ${senseData.top_customers?.[0]?.customer_name || 'Staffmark'} (${senseData.top_customers?.[0]?.arr_percentage || '3.53%'} of ARR)
  // - Customer concentration: Top 10 represent ${senseData.customer_concentration?.top_10_customers_arr_percentage || '13%'} of total ARR
  // - Major segments: ${senseData.top_customers?.slice(0, 5).map(c => c.segment).filter((v, i, a) => a.indexOf(v) === i).join(', ') || 'Staffing Enterprise, Corporate'}
  // - Comprehensive collections and receivables data available for detailed analysis

  // Remember: If you're creating a chart, avoid including tables or raw data in your markdown response. Provide insights and analysis only, and let the chart show the data visually.

  // USER QUESTION: "${userMessage}"

  // Provide a comprehensive analysis with actionable insights. If visualization would help, include the chart JSON.
  // `;
  // };

  const parseResponse = (response) => {
  console.log('Raw response:', response);
  
  // Enhanced regex to handle multiple JSON blocks more reliably
  const jsonMatches = response.match(/```json[\s]*\n([\s\S]*?)\n[\s]*```/g);
  
  if (jsonMatches && jsonMatches.length > 0) {
    try {
      const charts = [];
      
      // Process each JSON block separately
      jsonMatches.forEach((match, index) => {
        try {
          const jsonStr = match.replace(/```json[\s]*\n/, '').replace(/\n[\s]*```/, '').trim();
          console.log(`Parsing chart ${index + 1}:`, jsonStr);
          
          const chartData = JSON.parse(jsonStr);
          if (chartData.chartRequired) {
            // Fix common configuration issues
            if (chartData.config?.dataKey && Array.isArray(chartData.config.dataKey)) {
              console.warn('Fixing dataKey array to dataKeys:', chartData.config.dataKey);
              chartData.config.dataKeys = chartData.config.dataKey;
              delete chartData.config.dataKey;
            }
            
            // VALIDATE CHART BEFORE ADDING
            if (validateChart(chartData)) {
              chartData.id = `chart_${Date.now()}_${index}`;
              charts.push(chartData);
            } else {
              console.warn('Chart validation failed, skipping chart:', chartData.title);
            }
          }
        } catch (parseError) {
          console.error(`Failed to parse chart ${index + 1}:`, parseError);
          console.error('Problematic JSON:', match);
        }
      });
      
      // Remove all JSON blocks from text content
      const textContent = response.replace(/```json[\s]*\n[\s\S]*?\n[\s]*```/g, '').trim();
      
      console.log(`Successfully parsed ${charts.length} charts from ${jsonMatches.length} JSON blocks`);
      
      return {
        text: textContent,
        charts: charts.length > 0 ? charts : null
      };
    } catch (e) {
      console.error('Failed to parse chart JSON:', e);
      console.error('Raw matches:', jsonMatches);
    }
  }
  
  return { text: response, charts: null };
};
  const validateChart = (chartData) => {
  try {
    // Check basic structure
    if (!chartData.data || !Array.isArray(chartData.data) || chartData.data.length === 0) {
      console.warn('Invalid data array');
      return false;
    }
    
    // Check config
    if (!chartData.config || !chartData.config.xAxisKey) {
      console.warn('Missing config or xAxisKey');
      return false;
    }
    
    const firstDataPoint = chartData.data[0];
    
    // Validate xAxisKey exists in data
    if (!firstDataPoint.hasOwnProperty(chartData.config.xAxisKey)) {
      console.warn('xAxisKey not found in data:', chartData.config.xAxisKey);
      return false;
    }
    
    // For single metric charts
    if (chartData.config.dataKey) {
      if (!firstDataPoint.hasOwnProperty(chartData.config.dataKey)) {
        console.warn('dataKey not found in data:', chartData.config.dataKey);
        return false;
      }
    }
    
    // For multiple metric charts
    if (chartData.config.dataKeys && Array.isArray(chartData.config.dataKeys)) {
      const missingKeys = chartData.config.dataKeys.filter(key => 
        !firstDataPoint.hasOwnProperty(key)
      );
      if (missingKeys.length > 0) {
        console.warn('dataKeys not found in data:', missingKeys);
        return false;
      }
    }
    
    // Check for data with all null/undefined values
    const hasValidData = chartData.data.some(item => {
      if (chartData.config.dataKey) {
        return item[chartData.config.dataKey] != null;
      }
      if (chartData.config.dataKeys) {
        return chartData.config.dataKeys.some(key => item[key] != null);
      }
      return true;
    });
    
    if (!hasValidData) {
      console.warn('No valid data values found');
      return false;
    }
    
    console.log('Chart validation passed:', chartData.title);
    return true;
    
  } catch (error) {
    console.error('Chart validation error:', error);
    return false;
  }
};
  // Enhanced API response with real data analysis
  const getEnhancedResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Check if this is Interface.ai data
    if (dataSource?.financial_entries) {
      const attributes = [...new Set(dataSource.financial_entries.map(entry => entry.attribute))];
      
      if (attributes.includes('Customer Count') && attributes.includes('License Fee')) {
        // Interface.ai specific responses
        if (lowerQuestion.includes('growth') || lowerQuestion.includes('customer')) {
          const customerEntries = dataSource.financial_entries
            .filter(entry => entry.attribute === 'Customer Count' && entry.time_period !== 'Not Provided')
            .slice(-12);
          
          return `## Interface.ai Growth Analysis

**Key Insights:**
• **AI Platform Leadership**: Interface.ai serves enterprise customers with conversational AI solutions
• **Customer Base**: ${customerEntries.length > 0 ? customerEntries[customerEntries.length-1].value : '40+'} enterprise clients
• **Revenue Streams**: Dual model with License Fees (${dataSource.financial_entries.filter(e => e.attribute === 'License Fee').length} entries) and Usage Fees (${dataSource.financial_entries.filter(e => e.attribute === 'Usage Fee').length} entries)
• **AI Sophistication**: Bot Usage (${dataSource.financial_entries.filter(e => e.attribute === 'Bot Usage Fee').length} entries) + Agent Usage (${dataSource.financial_entries.filter(e => e.attribute === 'Agent Usage Fee').length} entries)

**Strategic Position:**
• Leading conversational AI platform with enterprise focus
• High-margin SaaS model with network effects
• Growing market opportunity in $25B+ AI space`;
        
        } else if (lowerQuestion.includes('revenue') || lowerQuestion.includes('license')) {
          const licenseEntries = dataSource.financial_entries
            .filter(entry => entry.attribute === 'License Fee' && entry.time_period !== 'Not Provided')
            .slice(-8);
          
          return `## Interface.ai Revenue Intelligence

**Revenue Model Analysis:**
• **License Revenue**: ${licenseEntries.length} data points showing enterprise subscriptions
• **Usage-Based Revenue**: Dynamic pricing based on AI interaction volume
• **Enterprise Focus**: High-value customers with sticky, recurring relationships
• **Market Position**: Leading player in conversational AI for enterprises

\`\`\`json
{
  "chartRequired": true,
  "chartType": "line",
  "title": "License Revenue Trend (Sample Period)",
  "data": [
    ${licenseEntries.slice(0, 6).map((entry) => 
      `{"month": "${entry.time_period}", "value": ${parseFloat(entry.value.replace(/[^0-9.]/g, '')) || 800}}`
    ).join(',\n    ')}
  ],
  "config": {
    "xAxisKey": "month",
    "dataKey": "value",
    "showGrid": true,
    "showTooltip": true,
    "colors": ["#8B5CF6"]
  }
}
\`\`\`

**Investment Highlights:**
• Scalable SaaS model with enterprise moats
• AI technology leadership in growing market
• Dual revenue streams reduce customer risk`;
        
        } else if (lowerQuestion.includes('ai') || lowerQuestion.includes('bot')) {
          return `## AI Platform Capabilities

**Conversational AI Excellence:**
• **Bot Interactions**: ${dataSource.financial_entries.filter(e => e.attribute === 'Bot Usage Fee').length} bot usage data points
• **Human-AI Hybrid**: ${dataSource.financial_entries.filter(e => e.attribute === 'Agent Usage Fee').length} agent-assisted interactions
• **Enterprise Ready**: Solutions designed for large-scale business deployments
• **Technology Stack**: Advanced NLP, machine learning, and conversation management

**Market Opportunity:**
• Conversational AI market growing 25%+ annually
• Enterprise automation driving demand
• Platform positioned for industry verticalization
• Strong competitive moats through customer relationships`;
        }
      } else if (attributes.includes('GMV Delivered') && attributes.includes('Revenue')) {
        // Elasticrun specific responses
        if (lowerQuestion.includes('growth') || lowerQuestion.includes('gmv') || lowerQuestion.includes('revenue')) {
          const gmvEntries = dataSource.financial_entries
            .filter(entry => entry.attribute === 'GMV Delivered' && entry.time_period !== 'Not Provided')
            .slice(-8);
          
          const revenueEntries = dataSource.financial_entries
            .filter(entry => entry.attribute === 'Revenue' && entry.time_period !== 'Not Provided')
            .slice(-8);

          const parseValue = (val) => parseFloat(val.replace(/[₹,\sCr]/g, '')) || 0;
          const latestGMV = gmvEntries.length > 0 ? parseValue(gmvEntries[gmvEntries.length-1]?.value) : 0;
          const latestRevenue = revenueEntries.length > 0 ? parseValue(revenueEntries[revenueEntries.length-1]?.value) : 0;
          const takeRate = latestGMV > 0 ? ((latestRevenue / latestGMV) * 100) : 0;
          
          return `## Elasticrun B2B Commerce Analysis

**Rural Commerce Platform Performance:**
• **Monthly GMV**: ₹${latestGMV.toFixed(1)}Cr (${gmvEntries[gmvEntries.length-1]?.time_period})
• **Monthly Revenue**: ₹${latestRevenue.toFixed(1)}Cr 
• **Take Rate**: ${takeRate.toFixed(2)}% (Revenue as % of GMV)
• **Market Focus**: Leading B2B rural commerce and distribution platform
• **Network Scale**: Extensive distribution network serving rural India

\`\`\`json
{
  "chartRequired": true,
  "chartType": "line",
  "title": "GMV & Revenue Growth Trend",
  "data": [
  ${gmvEntries.slice(-6).map((entry, index) => {
    const revenueEntry = revenueEntries.find(r => r.time_period === entry.time_period) || {};
    const gmvVal = parseValue(entry.value);
    const revVal = revenueEntry.value ? parseValue(revenueEntry.value) : 0;
    return `{"period": "${entry.time_period}", "gmv": ${gmvVal}, "revenue": ${revVal}}`;
  }).join(',\n    ')}
],
  "config": {
  "xAxisKey": "period",
  "dataKey": "gmv",  // Primary data key
  "secondaryDataKey": "revenue",  // For line charts with multiple lines
  "showGrid": true,
  "showTooltip": true,
  "colors": ["#FB923C", "#34D399"]
}
}
\`\`\`

**Strategic Insights:**
• Strong rural market penetration with expanding GMV base
• Technology-enabled distribution network creating competitive moats
• B2B commerce model serving underserved rural markets
• Platform positioned for continued growth in digitizing rural commerce`;
        
        } else if (lowerQuestion.includes('station') || lowerQuestion.includes('network') || lowerQuestion.includes('distribution')) {
          const stationEntries = dataSource.financial_entries
            .filter(entry => entry.attribute.includes('Station') && entry.time_period !== 'Not Provided')
            .slice(-5);
          
          return `## Elasticrun Distribution Network Analysis

**Network Operations:**
• **Distribution Strategy**: Asset-light model with partner station network
• **Rural Coverage**: Extensive reach into underserved rural markets
• **Station Data**: ${stationEntries.length} station-related data points tracked
• **Operational Model**: Technology-enabled distribution with local partnerships
• **Market Position**: Leading rural B2B commerce distribution platform

**Network Advantages:**
• Deep rural market penetration difficult for competitors to replicate
• Local partnerships creating strong community relationships
• Technology platform optimizing supply chain efficiency
• Scalable model with expanding geographic coverage`;
        
        } else if (lowerQuestion.includes('ebitda') || lowerQuestion.includes('profit') || lowerQuestion.includes('margin')) {
          const ebitdaEntries = dataSource.financial_entries
            .filter(entry => entry.attribute === 'EBITDA' && entry.time_period !== 'Not Provided')
            .slice(-5);
          
          return `## Elasticrun Profitability Analysis

**Financial Performance:**
• **EBITDA Tracking**: ${ebitdaEntries.length} monthly EBITDA data points
• **Unit Economics**: Focus on improving station-level profitability
• **Margin Strategy**: Balancing growth investment with profitability
• **Path to Profitability**: Clear roadmap for operational efficiency improvements

**Key Metrics:**
• Station profit optimization through technology
• Take rate improvement via value-added services
• Operational leverage from network scale effects
• Rural market leadership creating pricing power`;
        }
        
      } else if (attributes.includes('Gross Contribution') && attributes.includes('Passengers (in lakhs)')) {
        // Chalo specific responses
        if (lowerQuestion.includes('growth') || lowerQuestion.includes('revenue')) {
          const grossContribEntries = dataSource.financial_entries
            .filter(entry => entry.attribute === 'Gross Contribution')
            .slice(-6);
          
          const parseValue = (val) => parseFloat(val.replace(/[₹,\sCr]/g, '')) || 0;
          const firstValue = parseValue(grossContribEntries[0]?.value);
          const lastValue = parseValue(grossContribEntries[grossContribEntries.length-1]?.value);
          const growthRate = firstValue > 0 ? ((lastValue - firstValue) / firstValue * 100) : 0;
          
          return `## Chalo Growth Intelligence

**Transportation Platform Performance:**
• **Revenue Growth**: ${growthRate.toFixed(1)}% growth in Gross Contribution
• **Latest Metrics**: ₹${lastValue.toFixed(1)}Cr gross contribution (latest period)
• **Market Position**: Leading digital transportation platform in India
• **Business Model**: Asset-light, technology-enabled transportation services

\`\`\`json
{
  "chartRequired": true,
  "chartType": "bar",
  "title": "Gross Contribution Trend",
  "data": [
    ${grossContribEntries.map((entry) => 
      `{"period": "${entry.time_period}", "value": ${parseValue(entry.value)}}`
    ).join(',\n    ')}
  ],
  "config": {
    "xAxisKey": "period",
    "dataKey": "value",
    "showGrid": true,
    "showTooltip": true,
    "colors": ["#16A34A"]
  }
}
\`\`\`

**Investment Thesis:**
• Strong growth trajectory with expanding market
• Technology-enabled operational efficiency
• Large addressable market in Indian transportation`;
        
        } else if (lowerQuestion.includes('passenger') || lowerQuestion.includes('operational')) {
          return `## Chalo Operational Excellence

**Transportation Metrics:**
• **Passenger Data**: ${dataSource.financial_entries.filter(e => e.attribute === 'Passengers (in lakhs)').length} data points tracking ridership
• **Operational Scale**: Multi-city presence with expanding route network
• **Technology Platform**: Digital-first approach to urban transportation
• **Growth Strategy**: Market expansion with operational leverage

**Key Differentiators:**
• Data-driven route optimization
• Real-time passenger information systems
• Partnerships with city transportation authorities
• Focus on Tier 2 and Tier 3 city expansion`;
        }
      }
    }
    
    // Sense Labs specific responses (original logic)
    if (lowerQuestion.includes('arr') || lowerQuestion.includes('revenue')) {
      const segmentData = {};
      dataSource?.top_customers?.slice(0, 10).forEach(customer => {
        segmentData[customer.segment] = (segmentData[customer.segment] || 0) + parseFloat(customer.arr_value);
      });
      
      return `## Sense Labs ARR Analysis

**Key Business Metrics:**
• **Total ARR**: ${data?.financial_overview?.total_arr || '38,285,616'} ${data?.financial_overview?.currency || 'INR'}
• **Top Customer**: ${data?.top_customers?.[0]?.customer_name || 'Staffmark'} (${data?.top_customers?.[0]?.arr_percentage || '3.53%'} of ARR)
• **Customer Concentration**: Top 10 customers = ${data?.customer_concentration?.top_10_customers_arr_percentage || '13%'} of ARR
• **Market Focus**: Talent management solutions for staffing enterprises

\`\`\`json
{
  "chartRequired": true,
  "chartType": "bar",
  "title": "Top 10 Customers by ARR",
  "data": [
    ${data?.top_customers?.slice(0, 10).map((customer) => 
      `{"name": "${customer.customer_name}", "value": ${parseFloat(customer.arr_value)}}`
    ).join(',\n    ') || '{"name": "Staffmark", "value": 1349986}'}
  ],
  "config": {
    "xAxisKey": "name",
    "dataKey": "value",
    "showGrid": true,
    "showTooltip": true,
    "colors": ["#3B82F6"]
  }
}
\`\`\``;
    } else if (lowerQuestion.includes('segment')) {
      const segmentCounts = {};
      dataSource?.top_customers?.forEach(customer => {
        segmentCounts[customer.segment] = (segmentCounts[customer.segment] || 0) + 1;
      });
      
      return `## Customer Segment Intelligence

**Market Segmentation:**
• **Staffing Enterprise**: ${segmentCounts['Staffing Enterprise'] || 8} customers (dominant segment)
• **Corporate**: ${segmentCounts['Corporate'] || 2} high-value enterprise clients
• **Segment Strategy**: Focus on staffing and talent management verticals

**Business Intelligence:**
• Strong segment diversification reduces customer concentration risk
• Staffing enterprise segment shows high retention and expansion
• Cross-segment opportunities for product suite expansion`;
    }

    // Generic business insights
    return `**Business Intelligence Available:**

**For Sense Labs:**
• ARR analysis and customer performance metrics
• Customer segment distribution and concentration analysis
• Risk assessment and growth opportunity identification

**For Chalo:**  
• Transportation platform growth metrics
• Passenger volume and operational efficiency analysis
• Market expansion and profitability trends

**For Interface.ai:**
• Conversational AI platform performance
• Enterprise customer adoption and usage patterns
• SaaS metrics and AI technology leadership analysis

*Ask specific questions about growth, customers, revenue, or strategic insights for detailed analysis.*`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

   try {
    // Real API call to your backend
    const response = await fetch('http://164.52.221.208:9005/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: currentInput,
        senseData: dataSource,
        companyName: companyName,
        chatHistory: messages.slice(-10) // Send last 10 messages for context
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const parsedResponse = parseResponse(data.response);

    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: parsedResponse.text,
      charts: parsedResponse.charts,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    if (currentInput && data.response) {
      generateFollowUpQuestions(data.response, currentInput);
    }
  } catch (error) {
    console.error('Error:', error);
    // Fallback to enhanced response if API fails
    const mockResponse = getEnhancedResponse(currentInput, messages);
    const parsedResponse = parseResponse(mockResponse);

    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: parsedResponse.text,
      charts: parsedResponse.charts,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    if (currentInput && data.response) {
      generateFollowUpQuestions(data.response, currentInput);
    }
  } finally {
    setIsLoading(false);
  }
};
const generateFollowUpQuestions = async (botResponse, userQuestion) => {
  try {
    const response = await fetch('http://164.52.221.208:9005/api/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        botResponse,
        userQuestion,
        companyName,
        dataContext: Object.keys(dataSource || {})
      })
    });
    const data = await response.json();
    setDynamicQuestions(data.questions || []);
    
    setTimeout(() => setShowDynamicQuestions(true), 6000);
  } catch (error) {
    console.error('Failed to generate follow-up questions:', error);
  }
};

  // Generate dynamic questions based on available data
  const generateContextualQuestions = (data, previousQuestions = []) => {
    const baseQuestions = [
      "Show revenue growth analysis",
      "What are the key business metrics?", 
      "Analyze customer growth trends",
      "Investment thesis and opportunities",
      "SWOT analysis insights",
      "Market position and competitive analysis"
    ];

    // Add data-specific questions
    const contextualQuestions = [];
    
    // Check if we have financial entries (for Chalo/Interface)
    if (data.financial_entries && data.financial_entries.length > 0) {
      const attributes = [...new Set(data.financial_entries.map(entry => entry.attribute))];
      
      if (attributes.includes('License Fee') && attributes.includes('Customer Count')) {
        // Interface.ai questions
        contextualQuestions.push(
          "AI platform growth analysis",
          "Conversational AI market opportunity", 
          "SaaS metrics and enterprise adoption",
          "Bot vs Agent usage patterns"
        );
      } else if (attributes.includes('Gross Contribution')) {
        // Chalo questions
        contextualQuestions.push(
          "Transportation platform growth", 
          "Operational efficiency and passenger trends",
          "Market expansion opportunities",
          "Revenue trajectory analysis"
        );
      }
      if (attributes.includes('EBITDA')) {
        contextualQuestions.push("Profitability pathway", "EBITDA improvement strategy");
      }
    }
    
    // For Sense Labs data
    if (data.top_customers && data.top_customers.length > 0) {
      contextualQuestions.push(
        `Who is our largest customer?`,
        `Show customer segment breakdown`,
        `Analyze top ${Math.min(10, data.top_customers.length)} customers`
      );
    }

    // Mix current questions with some base questions
    const allQuestions = [...contextualQuestions, ...baseQuestions];
    
    // If we have previous questions, try to generate related ones
    if (previousQuestions.length > 0) {
      const lastQuestion = previousQuestions[previousQuestions.length - 1];
      const questionContent = (typeof lastQuestion === 'string' ? lastQuestion : lastQuestion?.content || '').toLowerCase();
      if (questionContent.includes('customer')) {
        allQuestions.unshift("Show revenue per customer", "Customer retention analysis");
      } else if (questionContent.includes('revenue') || questionContent.includes('arr')) {
        allQuestions.unshift("Revenue breakdown by segment", "Growth drivers analysis");
      }
    }

    // Return unique questions, limit to 6
    return [...new Set(allQuestions)].slice(0, 6);
  };

  const suggestedQuestions = generateContextualQuestions(dataSource, messages.filter(m => m.type === 'user'));

  const handleSuggestionClick = (question) => {
    setInputValue(question);
  };

  // Helper function to determine appropriate chart height based on type and data
  const getChartHeight = (chartType, dataLength) => {
    if (chartType === 'pie') return 200;
    if (chartType === 'bar' && dataLength > 10) return 220;
    if (chartType === 'line') return 180;
    return 160;
  };

  return (
    <>
      {/* Exciting Preview Message */}
      {showPreview && !isOpen && (
        <div className="fixed bottom-24 right-16 z-40 animate-bounce">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl shadow-xl max-w-xs relative">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 animate-pulse" />
              <div>
                <p className="font-semibold text-sm">🚀 {companyName} AI Ready!</p>
                <p className="text-xs text-white/80">Get instant business insights at your fingertips</p>
              </div>
            </div>
            {/* Arrow pointing to button */}
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Chatbot Toggle Button - Only shows when closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleOpenChatbot}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-4 shadow-xl transition-all duration-500 hover:scale-110 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient.replace('600', '400')} rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-20`}></div>
            <div className="relative z-10">
              <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-ping" />
            </div>
          </button>
        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 lg:w-[420px] bg-gray-900 shadow-2xl border-l border-gray-600 flex flex-col z-40 transform transition-transform duration-300 ease-out">
          {/* Close Button - Top Right Corner */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-50 hover:bg-white/10 rounded-full p-2 transition-colors text-white bg-black/20 backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className={`bg-gradient-to-r ${colors.gradient} text-white p-4 flex-shrink-0 pr-12`}>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">{companyName ? `${companyName} AI Assistant` : 'Business AI Assistant'}</h3>
                <p className="text-white/80 text-sm">Powered by your business data</p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800"
            style={{
              scrollBehavior: 'smooth'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 text-sm ${
                    message.type === 'user'
                      ? `bg-gradient-to-r ${colors.gradient} text-white`
                      : 'bg-gray-700 text-gray-100 border border-gray-600 shadow-sm'
                  }`}
                >
                  {message.type === 'bot' ? (
                    <div className="space-y-3">
                      <FormattedMessage content={message.content} />
                      
                      {/* Render Charts if present */}
                      {message.charts && message.charts.length > 0 && (
                        <div className="space-y-4 mt-4">
                          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            📊 Data Visualizations ({message.charts.length})
                          </div>
                          {message.charts.map((chart, index) => {
                            // Enhanced validation
                            if (!chart.data || !Array.isArray(chart.data) || chart.data.length === 0) {
                              console.warn(`Chart ${index + 1} has invalid data:`, chart);
                              return (
                                <div key={chart.id || index} className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                                  <p className="text-yellow-600 text-sm">⚠️ Chart data unavailable - {chart.title || 'Untitled Chart'}</p>
                                </div>
                              );
                            }
                            
                            // Validate data structure
                            const hasValidData = chart.data.every(item => 
                              typeof item === 'object' && item !== null
                            );
                            
                            if (!hasValidData) {
                              return (
                                <div key={chart.id || index} className="bg-red-50 rounded-lg p-3 border border-red-200">
                                  <p className="text-red-600 text-sm">❌ Invalid chart data format</p>
                                </div>
                              );
                            }
                            
                            return (
                              <div key={chart.id || index} className="bg-gray-800 rounded-lg p-4 border border-gray-600 shadow-sm hover:shadow-md transition-shadow">
                                {chart.title && (
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-200 text-sm">{chart.title}</h4>
                                    <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded-full">
                                      {chart.chartType}
                                    </span>
                                  </div>
                                )}
                                <div className="chart-wrapper" style={{ minHeight: '160px' }}>
                                  <ChartComponent
                                    key={chart.id || `chart-${index}`}
                                    type={chart.chartType}
                                    data={chart.data}
                                    config={{
                                      showTooltip: true,
                                      showGrid: chart.chartType !== 'pie',
                                      showLegend: chart.chartType === 'pie' || chart.config?.showLegend,
                                      title: null,
                                      ...chart.config,
                                      // Fix common dataKey issues
                                      ...(chart.config?.dataKey && Array.isArray(chart.config.dataKey) ? {
                                        dataKeys: chart.config.dataKey,
                                        dataKey: undefined
                                      } : {}),
                                    }}
                                    height={getChartHeight(chart.chartType, chart.data.length)}
                                    theme="light"
                                    compact={true}
                                  />
                                </div>
                                {chart.data.length > 10 && (
                                  <div className="mt-2 text-xs text-gray-400 text-center">
                                    Showing {chart.data.length} data points
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 bg-${colors.secondary} rounded-full animate-bounce`}></div>
                      <div className={`w-2 h-2 bg-${colors.primary} rounded-full animate-bounce`} style={{animationDelay: '0.1s'}}></div>
                      <div className={`w-2 h-2 bg-${colors.secondary} rounded-full animate-bounce`} style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-300">Analyzing {companyName} data...</span>
                  </div>
                </div>
              </div>
            )}
            {/* Dynamic Follow-up Questions */}
              {showDynamicQuestions && dynamicQuestions.length > 0 && (
                <div className="bg-gray-700 rounded-xl p-4 border border-blue-500 animate-fade-in">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">💡 Follow-up insights:</span>
                    <button 
                      onClick={() => setShowDynamicQuestions(false)}
                      className="ml-auto text-gray-400 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {dynamicQuestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(question);
                          setShowDynamicQuestions(false);
                          setDynamicQuestions([]);
                        }}
                        className="block w-full text-left text-sm bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 p-2 rounded-lg transition-all border border-blue-700/50 hover:border-blue-500"
                      >
                        <ChevronRight className="w-3 h-3 inline mr-1" />
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className={`w-4 h-4 text-${colors.primary}`} />
                  <p className="text-sm text-gray-300 font-medium">💡 Popular insights:</p>
                </div>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className={`block w-full text-left text-sm bg-gray-700 hover:bg-gray-600 text-${colors.secondary} p-3 rounded-xl transition-all border border-gray-600 hover:border-${colors.accent} hover:shadow-sm`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <div className="border-t border-gray-600 p-4 bg-gray-900 flex-shrink-0">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about GMV, revenue, growth trends..."
                className="flex-1 border border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-100 bg-gray-800"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`bg-gradient-to-r ${colors.gradient} hover:${colors.gradient.replace('600', '700')} disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl p-3 transition-all hover:scale-105 disabled:hover:scale-100`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              AI-powered insights • Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;