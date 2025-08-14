require('dotenv').config();
console.log('API Key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');
console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10));
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 9005;
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const generatePrompt = (userMessage, chatHistory, businessData, companyName = 'Business') => {
  if (!companyName || companyName === 'Business') {
    if (businessData?.top_customers) companyName = 'Sense Labs';
    else if (businessData?.financial_entries) {
      const attributes = businessData.financial_entries.map(e => e.attribute);
      if (attributes.includes('Passengers (in lakhs)')) companyName = 'Chalo';
      else if (attributes.includes('Customer Count')) companyName = 'Interface.ai';  
      else if (attributes.includes('GMV Delivered')) companyName = 'Elasticrun';
    }
  }
    const historyContext = chatHistory && chatHistory.length > 0 
    ? `\n\nCONVERSATION HISTORY:\n${chatHistory.map(msg => `${msg.type.toUpperCase()}: ${msg.content}`).slice(-6).join('\n')}\n`
    : '';

  return `
You are a business analyst for ${companyName} with access to comprehensive quarterly data. Provide specific, accurate answers with key insights in text, followed by supporting visualizations when they add value.

KEY CAPABILITIES:
- Analyze current ARR performance and customer concentration
- Track growth trends across multiple months,quarters,years (Q2'23 to Q1'25)
- Compare quarterly performance, retention rates, and customer metrics
- Examine collections efficiency and receivables aging
- Identify top customers and their contribution to revenue
- Identify top performing products and services
- Segment analysis and customer distribution insights and so on...

RESPONSE APPROACH:
1. Start with clear, specific textual insights answering the user's question
2. Use actual data from the dataset - never hallucinate metrics
3. **For every value or metric you quote, always mention the JSON path or key you used as the source in square brackets, e.g., [source: top_customers[0].arr_percentage]**
4. Include relevant charts that support your textual answer when helpful
5. For growth questions, use the extensive quarterly historical data available

RESPONSE FORMAT:
- **Key Insights**: 2-4 bullet points with specific numbers from actual data
- **Supporting Chart**: Include when it enhances understanding (max 1-2 charts)
- **CONCISE RESPONSES**: Keep textual responses under 200 words. Be direct and actionable.
- **NO REPETITION**: Avoid redundant explanations or verbose descriptions
CHART RULES - FOLLOW EXACTLY:

**CRITICAL: Chart Configuration Rules**
1. For charts with ONE metric per data point: use "dataKey": "fieldname" 
2. For charts with MULTIPLE metrics per data point: use "dataKeys": ["field1", "field2"]
3. NEVER use "dataKey": ["array"] - this breaks charts!

**SUPPORTED CHART TYPES:**
- **bar** / **column**: Single or multiple bars
- **grouped_bar** / **groupedBar**: Multiple data series as grouped bars  
- **line** / **trend**: Single or multiple lines
- **multi_line**: Multiple line series
- **pie**: Pie chart for single metric
- **scatter**: Scatter plot for x/y data

**Examples:**

Single metric (pie/single bar):
\`\`\`json
{
  "chartRequired": true,
  "chartType": "pie",
  "title": "Revenue Distribution", 
  "data": [{"segment": "Tech", "value": 100}, {"segment": "Sales", "value": 200}],
  "config": {
    "xAxisKey": "segment",
    "dataKey": "value",
    "colors": ["#3B82F6", "#10B981"]
  }
}
\`\`\`

Multiple metrics (line/grouped bar):
\`\`\`json
{
  "chartRequired": true,
  "chartType": "grouped_bar",
  "title": "GMV Trend by Segments",
  "data": [
    {"month": "Oct-24", "rural_gmv": 34.6, "comex_gmv": 288.8},
    {"month": "Nov-24", "rural_gmv": 35.9, "comex_gmv": 240.1}
  ],
  "config": {
    "xAxisKey": "month", 
    "dataKeys": ["rural_gmv", "comex_gmv"],
    "showGrid": true,
    "showTooltip": true,
    "showLegend": true,
    "colors": ["#3B82F6", "#10B981"]
  }
}
\`\`\`

**CRITICAL RULES:**
- Field names: use snake_case (rural_gmv) NOT spaces (Rural GMV)
- No null values in data - exclude incomplete data points
- dataKeys = array for multiple metrics
- dataKey = string for single metric

**FIELD NAMING RULES:**
- Use snake_case or camelCase for field names (no spaces!)
- WRONG: "Rural GMV", "Net Revenue" 
- CORRECT: "rural_gmv", "net_revenue" or "ruralGMV", "netRevenue"

Example:
\`\`\`json
{
  "data": [
    {"month": "Jan", "rural_gmv": 34.6, "comex_gmv": 288.8},
    {"month": "Feb", "rural_gmv": 35.9, "comex_gmv": 240.1}
  ],
  "config": {
    "xAxisKey": "month",
    "dataKeys": ["rural_gmv", "comex_gmv"]
  }
}
\`\`\`

**REMEMBER:**
- dataKey = string (for single metric)
- dataKeys = array (for multiple metrics)
- Match field names exactly from your data

MULTIPLE CHART EXAMPLES:
- **Customer Analysis**: Bar chart of top customers + Pie chart of segments
- **Growth Analysis**: Line chart of ARR trend + Bar chart of quarterly growth
- **Risk Analysis**: Bar chart of concentration + Pie chart of diversification
- **Performance Analysis**: Multiple metrics across different chart types

IMPORTANT:
- Be accurate and specific with numbers from the actual data
- Don't hallucinate data or create fake metrics
- **For every value or metric you quote, always mention the JSON path or key you used as the source in square brackets, e.g., [source: top_customers[0].arr_percentage]**
- Focus on answering the specific question asked
- Charts should supplement, not replace, your textual insights
- The textual response should be not very verbose rather it should be nicely formatted, bulleted, highlighting important information.

FULL DATASET: ${businessData ? JSON.stringify(businessData).substring(0, 50000) : 'No data provided'}...${historyContext}

USER QUESTION: "${userMessage}"

Provide specific insights first, then supporting visualizations.
`;
};

app.post('/api/chat', async (req, res) => {
  const { message, senseData, companyName, chatHistory } = req.body;
  
  console.log('Received request:', {
    message: message ? message.substring(0, 50) : 'undefined',
    senseData: senseData ? `${typeof senseData} (${senseData.toString().substring(0, 50)}...)` : 'undefined',
    chatHistory: chatHistory ? `Array(${chatHistory.length})` : 'undefined'
  });

  try {
    let promptContent;
    try {
      promptContent = generatePrompt(message, chatHistory, senseData, companyName);

    } catch (promptError) {
      console.error('Error generating prompt:', promptError);
      return res.status(400).json({ error: 'Failed to generate prompt', details: promptError.message });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: `You are analyzing ${companyName || 'business'} data.`
          },
          {
            role: 'user',
            content: promptContent
          }
        ],
        max_tokens: 8000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
        res.json({
            response: data.choices[0].message.content
        });
        } else {
        console.error('No choices in API response:', data);
        res.status(500).json({ error: 'Invalid API response' });
        }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/generate-questions', async (req, res) => {
  const { botResponse, userQuestion, companyName, dataContext } = req.body;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [{
          role: 'user',
          content: `Based on this conversation about ${companyName}:
User asked: "${userQuestion}"
Bot answered: "${botResponse.substring(0, 1000)}..."

Generate 4 relevant follow-up questions that would provide deeper insights. Available data includes: ${dataContext.join(', ')}.

Return only a JSON array of strings:
["Question 1", "Question 2", "Question 3", "Question 4"]`
        }],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    const questions = JSON.parse(content);
    
    res.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ questions: [] });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://164.52.221.208:${port}`);
});
