import React, { useState } from 'react';
import { Send, Loader, BarChart3, TrendingUp, PieChart, Zap, X, Table, Layers, Sparkles, Lightbulb } from 'lucide-react';
import { ChartComponent } from './ChartComponent';
import { Card } from '../atoms/Card/Card';
import { Heading } from '../atoms/Typography/Typography';
import styles from './DynamicChartGenerator.module.css';

export const DynamicChartGenerator = ({ 
  businessData, 
  companyName = 'Business',
  theme = 'light',
  className = '',
  onClose = null // Optional close handler for modal-like behavior
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedChart, setGeneratedChart] = useState(null);
  const [error, setError] = useState('');

  const handleGenerateChart = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setGeneratedChart(null);

    try {
      const response = await fetch('/api/chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          senseData: businessData,
          companyName: companyName
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate chart');
      }

      const data = await response.json();
      
      // Parse the response to extract chart configuration
      try {
        let chartConfig = null;
        
        // First try to parse as markdown wrapped JSON
        const chartMatch = data.response.match(/```json\s*([\s\S]*?)\s*```/);
        if (chartMatch) {
          chartConfig = JSON.parse(chartMatch[1]);
        } else {
          // Try to parse as direct JSON response
          try {
            chartConfig = JSON.parse(data.response);
          } catch {
            // If not direct JSON, look for JSON object in the text
            const jsonMatch = data.response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              chartConfig = JSON.parse(jsonMatch[0]);
            }
          }
        }
        
        if (chartConfig && chartConfig.chartRequired && chartConfig.chartType && chartConfig.data) {
          setGeneratedChart({
            type: chartConfig.chartType,
            data: chartConfig.data,
            config: {
              title: chartConfig.title || 'Generated Chart',
              showGrid: true,
              showTooltip: true,
              showLegend: true,
              ...chartConfig.config
            }
          });
        } else {
          setError('No valid chart configuration found in response');
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
        setError('Failed to parse chart configuration');
      }
    } catch (err) {
      setError('Failed to generate chart. Please try again.');
      console.error('Chart generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateChart();
    }
  };

  const clearChart = () => {
    setGeneratedChart(null);
    setError('');
    setQuery('');
  };

  const themeClasses = {
    light: {
      container: 'bg-white border-gray-200',
      input: 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      text: 'text-gray-700',
      icon: 'text-blue-600'
    },
    dark: {
      container: 'bg-gray-800 border-gray-700',
      input: 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      text: 'text-gray-300',
      icon: 'text-blue-400'
    }
  };

  const currentTheme = themeClasses[theme] || themeClasses.light;

  return (
    <div className={`${styles.dynamicChartGenerator} ${className}`}>
      <Card 
        className={`${currentTheme.container} border-2 shadow-xl`}
        padding="none"
      >
        {/* Header with gradient */}
        <div className={`px-6 py-4 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-blue-800/50 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm'} shadow-lg`}>
                <Sparkles className={`w-6 h-6 ${currentTheme.icon}`} />
              </div>
              <div>
                <Heading level={4} variant={theme === 'dark' ? 'inverse' : 'primary'} className="mb-1">
                  AI Chart Generator
                </Heading>
                <p className={`text-sm ${theme === 'dark' ? 'text-blue-200' : 'text-blue-600'}`}>
                  Create custom visualizations with natural language
                </p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-all hover:rotate-90 ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Section with enhanced design */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div className={`absolute left-3 top-3 ${currentTheme.icon}`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the visualization you want... 
Examples:
• 'EBITDA% and net revenue for last 3 quarters in mixed chart'
• 'Show quarterly metrics in a table format'
• 'Compare revenue trends with customer growth'"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 resize-none ${currentTheme.input} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm`}
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleGenerateChart}
                  disabled={!query.trim() || isLoading}
                  className={`px-8 py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${currentTheme.button} flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
                {query.trim() && (
                  <button
                    onClick={() => setQuery('')}
                    className={`px-4 py-2 text-sm rounded-lg transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Enhanced Quick Examples */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${currentTheme.text}`}>Quick Examples:</span>
                <div className={`h-px flex-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { text: 'Mixed: Revenue & EBITDA trends', icon: Layers },
                  { text: 'Table: Quarterly metrics', icon: Table },
                  { text: 'Growth analysis comparison', icon: TrendingUp },
                  { text: 'Customer segment breakdown', icon: PieChart }
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(example.text.split(': ')[1] || example.text)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg border transition-all ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-blue-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-white hover:border-blue-400'
                    } hover:shadow-md transform hover:-translate-y-0.5`}
                    disabled={isLoading}
                  >
                    <example.icon className="w-4 h-4 opacity-70" />
                    <span className="text-left">{example.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Display with better styling */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-red-800">Generation Failed</h4>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Generated Visualization Display */}
          {generatedChart && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></div>
                  <h4 className={`font-semibold ${currentTheme.text}`}>Generated Visualization</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {generatedChart.type.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={clearChart}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  } hover:shadow-md`}
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              </div>
              
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <ChartComponent
                  type={generatedChart.type}
                  data={generatedChart.data}
                  config={generatedChart.config}
                  theme={theme}
                  height={350}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Enhanced Chart Type Guide */}
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`text-sm font-medium ${currentTheme.text} mb-3`}>Supported Visualization Types:</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: BarChart3, label: 'Bar Charts', desc: 'Compare values' },
                { icon: TrendingUp, label: 'Line Charts', desc: 'Show trends' },
                { icon: PieChart, label: 'Pie Charts', desc: 'Show parts' },
                { icon: Layers, label: 'Mixed Charts', desc: 'Combine types' },
                { icon: Table, label: 'Data Tables', desc: 'Detailed view' },
                { icon: Zap, label: 'Scatter Plots', desc: 'Correlations' }
              ].map((type, index) => (
                <div key={index} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} hover:shadow-sm transition-all`}>
                  <type.icon className={`w-5 h-5 ${currentTheme.icon} mb-2`} />
                  <div className={`font-medium text-xs ${currentTheme.text}`}>{type.label}</div>
                  <div className={`text-xs opacity-70 ${currentTheme.text}`}>{type.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DynamicChartGenerator;