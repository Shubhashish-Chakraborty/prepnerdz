import { NextRequest, NextResponse } from 'next/server';
import { askNerdContext } from './context';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function POST(request: NextRequest) {
  try {
    const { message, apiKey } = await request.json();

    if (!message || !apiKey) {
      return NextResponse.json(
        { error: 'Message and API key are required' },
        { status: 400 }
      );
    }

    // Create context for PrepNerdz-specific responses
    // const context = `You are AskNerd, an AI assistant for PrepNerdz - an educational platform for students. 
    
    // PrepNerdz provides:
    // - Study materials and resources
    // - DSA (Data Structures and Algorithms) content
    // - Academic notes and guides
    // - Contribution opportunities for developers
    
    // Common topics users ask about:
    // - Finding study materials and resources
    // - How to contribute to the project
    // - Navigation and platform features
    // - DSA resources and practice problems
    // - Academic guidance and tips
    
    // Be helpful, friendly, and concise. If you don't know something specific about PrepNerdz, suggest they check the website or contact support.`;

    const prompt = `${askNerdContext}\n\nUser: ${message}\n\nAskNerd:`;

    console.log('Sending request to Gemini API...');

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response data:', JSON.stringify(data, null, 2));

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      return NextResponse.json({ response: responseText });
    } else {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from Gemini API');
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        response: "I'm sorry, I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."
      },
      { status: 500 }
    );
  }
} 