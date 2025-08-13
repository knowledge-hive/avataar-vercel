export const sendChatMessage = async (message, senseData) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        senseData: JSON.stringify(senseData)
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};