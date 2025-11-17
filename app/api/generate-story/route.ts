import { NextRequest, NextResponse } from 'next/server';
import { openai, DEFAULT_MODEL, DEFAULT_TEMPERATURE, DEFAULT_MAX_TOKENS } from '@/lib/openai';
import { SYSTEM_PROMPT, createUserPrompt } from '@/lib/prompts';
import { generateStorySchema, userStorySchema } from '@/lib/validators';
import { GenerateStoryResponse } from '@/types/story';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedInput = generateStorySchema.parse(body);

    const { userInput, role, context, criteriaFormat } = validatedInput;

    // Create the user prompt
    const userPrompt = createUserPrompt(userInput, role, context, criteriaFormat);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: DEFAULT_TEMPERATURE,
      max_tokens: DEFAULT_MAX_TOKENS,
      response_format: { type: 'json_object' },
    });

    // Extract and parse the response
    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const parsedStory = JSON.parse(responseContent);
    
    // Validate the story structure
    const validatedStory = userStorySchema.parse(parsedStory);

    // Return success response
    const response: GenerateStoryResponse = {
      success: true,
      story: validatedStory,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error generating story:', error);

    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input. Please check your request and try again.',
        } as GenerateStoryResponse,
        { status: 400 }
      );
    }

    // Handle OpenAI API errors
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to generate story. Please try again.',
        } as GenerateStoryResponse,
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      } as GenerateStoryResponse,
      { status: 500 }
    );
  }
}
