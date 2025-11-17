'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateStorySchema, type GenerateStoryInput } from '@/lib/validators';
import { UserStory } from '@/types/story';

interface StoryGeneratorFormProps {
  onStoryGenerated: (story: UserStory) => void;
}

export function StoryGeneratorForm({ onStoryGenerated }: StoryGeneratorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GenerateStoryInput>({
    resolver: zodResolver(generateStorySchema),
    defaultValues: {
      criteriaFormat: 'given-when-then',
    },
  });

  const onSubmit = async (data: GenerateStoryInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success || !result.story) {
        throw new Error(result.error || 'Failed to generate story');
      }

      onStoryGenerated(result.story);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generate User Story
        </CardTitle>
        <CardDescription>
          Describe the feature or need, and we'll create a well-structured user story following INVEST best practices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Main Input */}
          <div className="space-y-2">
            <Label htmlFor="userInput">
              What feature or need do you want to capture? <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="userInput"
              placeholder="e.g., Users need to reset their password when they forget it"
              rows={4}
              {...register('userInput')}
              className={errors.userInput ? 'border-red-500' : ''}
            />
            {errors.userInput && (
              <p className="text-sm text-red-500">{errors.userInput.message}</p>
            )}
          </div>

          {/* Optional Fields Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowOptional(!showOptional)}
            className="text-sm"
          >
            {showOptional ? '− Hide' : '+ Show'} optional details
          </Button>

          {/* Optional Fields */}
          {showOptional && (
            <div className="space-y-4 border-l-2 border-slate-200 pl-4">
              <div className="space-y-2">
                <Label htmlFor="role">User Role (optional)</Label>
                <Input
                  id="role"
                  placeholder="e.g., customer, admin, new user"
                  {...register('role')}
                />
                <p className="text-xs text-slate-500">
                  Specify the type of user for more targeted stories
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Context (optional)</Label>
                <Input
                  id="context"
                  placeholder="e.g., E-commerce platform, mobile app"
                  {...register('context')}
                />
                <p className="text-xs text-slate-500">
                  Provide additional context about your product or domain
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="criteriaFormat">Acceptance Criteria Format</Label>
                <select
                  id="criteriaFormat"
                  {...register('criteriaFormat')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="given-when-then">Given-When-Then</option>
                  <option value="bullet">Bullet Points</option>
                  <option value="both">Both Formats</option>
                </select>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 border border-red-200">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Crafting your story...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Story
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
