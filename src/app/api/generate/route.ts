import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function generateNoKeyFallback(prompt: string): string {
  return `// Fallback response for: "${prompt}"

export const sayHello = () => {
  console.log('Hello from CodeDock AI');
};`;
}

function generateQuotaFallback(prompt: string): string {
  return `// Quota exceeded fallback for: "${prompt}"

import React from 'react';

const ExampleComponent = () => (
  <div className="p-4 bg-gray-100 rounded">
    <h1 className="text-xl font-bold">Hello, Developer</h1>
    <p>This is a simulated output to show how your code would look like. Currently your quota tokens in exhausted.</p>
  </div>
);

export default ExampleComponent;`;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 10) {
      return NextResponse.json(
        { response: 'Please enter a more detailed and code-related prompt.' },
        { status: 400 }
      );
    }

    if (!openai) {
      const fallback = generateNoKeyFallback(prompt);
      return NextResponse.json({
        response: fallback,
        model: 'mock-no-key',
        usage: null,
        timestamp: new Date().toISOString(),
        message: 'Mock code generated – no API key configured.',
      });
    }

    const systemPrompt = `
You are an expert software engineer and AI code assistant.

Your job is to generate production-ready, clean code only.
Add comments and structure.
Do not explain anything unless asked.
If the prompt is not code-related, return:
"Sorry, I can only generate code-related responses. Please enter a valid coding task."
`.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const code = completion.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      response: code || 'GPT returned an empty response.',
      model: 'gpt-3.5-turbo',
      usage: completion.usage,
      timestamp: new Date().toISOString(),
      message: 'Code generated successfully.',
    });

  } catch (error: any) {
    console.error('[CodeDock Error]:', error);

    if (error.code === 'insufficient_quota' || error.message?.includes('quota')) {
      const fallback = generateQuotaFallback("Your recent prompt");
      return NextResponse.json({
        response: fallback,
        model: 'mock-quota-exceeded',
        usage: null,
        timestamp: new Date().toISOString(),
        message: 'Quota exceeded – returned fallback mock code.',
      });
    }

    if (error instanceof Error && error.message.includes('401')) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
