'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserStory } from '@/types/story';
import { CheckCircle2, Circle } from 'lucide-react';

interface StoryDisplayProps {
  story: UserStory;
}

const INVEST_LABELS = {
  independent: 'Independent',
  negotiable: 'Negotiable',
  valuable: 'Valuable',
  estimable: 'Estimable',
  small: 'Small',
  testable: 'Testable',
};

const INVEST_DESCRIPTIONS = {
  independent: 'Stands alone without dependencies',
  negotiable: 'Open to discussion and refinement',
  valuable: 'Delivers clear user or business value',
  estimable: 'Team can estimate the effort required',
  small: 'Can be completed within a sprint',
  testable: 'Has clear, measurable outcomes',
};

export function StoryDisplay({ story }: StoryDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📋 Your Generated Story
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Story */}
        <div className="space-y-3 rounded-lg bg-slate-50 p-6">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold text-slate-700">As a</span>{' '}
              <span className="font-medium text-slate-900">{story.role}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-slate-700">I want</span>{' '}
              <span className="font-medium text-slate-900">{story.goal}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-slate-700">So that</span>{' '}
              <span className="font-medium text-slate-900">{story.benefit}</span>
            </p>
          </div>
        </div>

        {/* Acceptance Criteria */}
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Acceptance Criteria
          </h3>
          <div className="space-y-3">
            {story.acceptanceCriteria.map((criterion) => (
              <div
                key={criterion.id}
                className="rounded-md border border-slate-200 bg-white p-4"
              >
                {criterion.type === 'given-when-then' ? (
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold text-slate-700">Given</span>{' '}
                      {criterion.given}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-slate-700">When</span>{' '}
                      {criterion.when}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-slate-700">Then</span>{' '}
                      {criterion.then}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm">• {criterion.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* INVEST Quality Indicators */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">INVEST Quality Indicators</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Object.entries(story.investScore).map(([key, value]) => {
              const investKey = key as keyof typeof INVEST_LABELS;
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 rounded-md border border-slate-200 bg-white p-3"
                  title={INVEST_DESCRIPTIONS[investKey]}
                >
                  {value ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-300 flex-shrink-0" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-slate-900 truncate">
                      {INVEST_LABELS[investKey]}
                    </span>
                    <Badge
                      variant={value ? 'default' : 'secondary'}
                      className="w-fit text-xs mt-0.5"
                    >
                      {value ? 'Met' : 'Review'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
