import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import classNames from "classnames";
import { Card } from "../atoms/Card/Card";
import { Heading } from "../atoms/Typography/Typography";
import styles from "./ChartComponent.module.css";
import React, { useState, useEffect } from "react";

export const ChartComponent = ({
  type,
  data,
  config,
  fullWidth = false,
  height = 300,
  className,
  style,
  theme = 'light',
  compact = false,
  ...props
}) => {
  console.log('ChartComponent props:', { type, data, config });
  
  const chartClasses = classNames(
    styles.chartComponent,
    {
      [styles.fullWidth]: fullWidth,
      [styles.interactive]: config.interactive,
      [styles.darkTheme]: theme === 'dark',
    },
    className
  );

  // Theme-based color schemes
  const lightColors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#EC4899", // Pink
    "#84CC16", // Lime
  ];

  const darkColors = [
    "#6B46C1", // Primary purple
    "#7C3AED", // Secondary purple
    "#10B981", // Success green
    "#3B82F6", // Info blue
    "#F59E0B", // Warning yellow
    "#EF4444", // Error red
    "#8B5CF6", // Light purple
    "#EC4899", // Pink
    "#06B6D4", // Cyan
  ];

  const colors = config.colors || (theme === 'dark' ? darkColors : lightColors);

  // Theme-based styling
  const gridColor = theme === 'light' ? '#f3f4f6' : '#2D2D2D';
  const textColor = theme === 'light' ? '#374151' : '#A3A3A3';
  const tooltipBg = theme === 'light' ? '#ffffff' : '#262626';
  const tooltipBorder = theme === 'light' ? '#e5e7eb' : '#2D2D2D';
  const tooltipTextColor = theme === 'light' ? '#1f2937' : '#FFFFFF';

  const commonProps = {
    data,
    width: undefined,
    height: undefined,
  };

  // Animation state
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const renderChart = () => {
    // Apply animation styles directly to chart container
    const chartStyle = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      transition: 'all 0.7s ease-out',
    };

    switch (type) {
      case "bar":
        return (
          <BarChart {...commonProps} style={chartStyle}>
            {config.showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            )}
            <XAxis
              dataKey={config.xAxisKey || "name"}
              stroke={textColor}
              fontSize={compact ? 10 : 12}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-40}
              textAnchor="end"
              height={compact ? 60 : 80}
              tickFormatter={(value) =>
                value.length > (compact ? 10 : 14) 
                  ? `${value.substring(0, compact ? 10 : 14)}...` 
                  : value
              }
            />
            <YAxis
              stroke={textColor}
              fontSize={compact ? 10 : 12}
              tickLine={false}
              axisLine={false}
            />
            {config.showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "8px",
                  color: tooltipTextColor,
                  fontSize: compact ? "12px" : "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
                animationDuration={300}
                animationEasing="ease-out"
              />
            )}
            {config.showLegend && (
              <Legend 
                wrapperStyle={{ 
                  color: textColor,
                  fontSize: compact ? "11px" : "12px"
                }} 
              />
            )}
            {/* MULTIPLE BARS OR SINGLE BAR */}
            {config.dataKeys && Array.isArray(config.dataKeys) ? 
              config.dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1200}
                  animationBegin={200 + (index * 100)}
                  animationEasing="ease-out"
                  name={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                />
              )) :
              <Bar
                dataKey={config.dataKey || "value"}
                fill={colors[0]}
                radius={[4, 4, 0, 0]}
                animationDuration={1200}
                animationBegin={200}
                animationEasing="ease-out"
              />
            }
          </BarChart>
        );

      case "line":
        return (
          <LineChart {...commonProps} style={chartStyle}>
            {config.showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            )}
            <XAxis
              dataKey={config.xAxisKey || "name"}
              stroke={textColor}
              fontSize={compact ? 10 : 12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={textColor}
              fontSize={compact ? 10 : 12}
              tickLine={false}
              axisLine={false}
            />
            {config.showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "8px",
                  color: tooltipTextColor,
                  fontSize: compact ? "12px" : "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
                animationDuration={300}
                animationEasing="ease-out"
              />
            )}
            {config.showLegend && (
              <Legend 
                wrapperStyle={{ 
                  color: textColor,
                  fontSize: compact ? "11px" : "12px"
                }} 
              />
            )}
            {/* MULTIPLE LINES OR SINGLE LINE */}
            {config.dataKeys && Array.isArray(config.dataKeys) ? 
              config.dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={compact ? 2 : 3}
                  dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: compact ? 3 : 4 }}
                  activeDot={{ 
                    r: compact ? 4 : 6, 
                    fill: colors[index % colors.length],
                    stroke: colors[index % colors.length],
                    strokeWidth: 2,
                  }}
                  animationDuration={1500}
                  animationBegin={300 + (index * 100)}
                  animationEasing="ease-out"
                  name={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                />
              )) :
              <Line
                type="monotone"
                dataKey={config.dataKey || "value"}
                stroke={colors[0]}
                strokeWidth={compact ? 2 : 3}
                dot={{ fill: colors[0], strokeWidth: 2, r: compact ? 3 : 4 }}
                activeDot={{ 
                  r: compact ? 4 : 6, 
                  fill: colors[0],
                  stroke: colors[0],
                  strokeWidth: 2,
                }}
                animationDuration={1500}
                animationBegin={300}
                animationEasing="ease-out"
              />
            }
          </LineChart>
        );

      case "pie":
        return (
          <PieChart {...commonProps} style={chartStyle}>
            {config.showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "8px",
                  color: tooltipTextColor,
                  fontSize: compact ? "12px" : "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
                animationDuration={300}
                animationEasing="ease-out"
              />
            )}
            {config.showLegend && (
              <Legend 
                wrapperStyle={{ 
                  color: textColor,
                  fontSize: compact ? "11px" : "12px"
                }} 
              />
            )}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={compact ? 60 : 80}
              fill="#8884d8"
              dataKey={config.dataKey || "value"}
              label={({ name, percent }) =>
                `${name} ${((percent || 0) * 100).toFixed(0)}%`
              }
              labelStyle={{
                fontSize: compact ? "10px" : "12px",
                fill: textColor
              }}
              animationDuration={1200}
              animationBegin={200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        );

      case "scatter":
        return (
          <ScatterChart {...commonProps} style={chartStyle}>
            {config.showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            )}
            <XAxis
              dataKey={config.xAxisKey || "x"}
              stroke={textColor}
              fontSize={compact ? 10 : 12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey={config.yAxisKey || "y"}
              stroke={textColor}
              fontSize={compact ? 10 : 12}
              tickLine={false}
              axisLine={false}
            />
            {config.showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "8px",
                  color: tooltipTextColor,
                  fontSize: compact ? "12px" : "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
                animationDuration={300}
                animationEasing="ease-out"
              />
            )}
            {config.showLegend && (
              <Legend 
                wrapperStyle={{ 
                  color: textColor,
                  fontSize: compact ? "11px" : "12px"
                }} 
              />
            )}
            <Scatter 
              dataKey={config.dataKey || "value"} 
              fill={colors[0]}
              animationDuration={1000}
              animationBegin={300}
              animationEasing="ease-out"
            />
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  return (
    <Card 
        className={`${chartClasses} ${compact ? styles.compactChart : ''}`} 
        style={style} 
        padding="none"
        {...props}
    >
      {config.title && (
        <div className={styles.chartHeader}>
          <Heading 
            level={compact ? 5 : 4} 
            variant={theme === 'dark' ? 'inverse' : 'primary'}
          >
            {config.title}
          </Heading>
        </div>
      )}

      <div className={compact ? styles.compactContainer : styles.chartContainer}>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart() || <></>}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};