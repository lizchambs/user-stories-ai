'use client';

import { useState } from 'react';
import { StoryGeneratorForm } from '@/components/story-generator-form';
import { StoryDisplay } from '@/components/story-display';
import { ExportButtons } from '@/components/export-buttons';
import { UserStory } from '@/types/story';

export default function Home() {
  const [generatedStory, setGeneratedStory] = useState<UserStory | null>(null);

  const handleStoryGenerated = (story: UserStory) => {
    setGeneratedStory(story);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGenerateAnother = () => {
    setGeneratedStory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Generate High-Quality{' '}
            <span className="text-blue-600">User Stories</span>
          </h1>
          <p className="text-lg text-slate-600 md:text-xl">
            Transform your ideas into well-structured user stories.
            No sign-up required.
          </p>
        </div>
      </section>

      {/* Generator Section */}
      <section className="container pb-12">
        <div className="mx-auto max-w-3xl">
          <StoryGeneratorForm onStoryGenerated={handleStoryGenerated} />
        </div>
      </section>

      {/* Results Section */}
      {generatedStory && (
        <section id="results" className="container pb-20">
          <div className="mx-auto max-w-3xl space-y-6">
            <StoryDisplay story={generatedStory} />
            <ExportButtons 
              story={generatedStory} 
              onGenerateAnother={handleGenerateAnother}
            />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm py-8 mt-20">
        <div className="container text-center text-sm text-slate-600">
          <p>
            Built with ♥️ using Next.js, React, and OpenAI
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Just clean, excellent user stories. No prioritization. No filtering. No roadmapping.
          </p>
        </div>
      </footer>
    </div>
  );
}
