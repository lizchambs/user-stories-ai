'use client';

import { useState } from 'react';
import { Copy, Download, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserStory } from '@/types/story';
import { formatStoryAsPlainText, formatStoryAsMarkdown, copyToClipboard, downloadMarkdown } from '@/lib/export-utils';
import { toast } from 'sonner';

interface ExportButtonsProps {
  story: UserStory;
  onGenerateAnother: () => void;
}

export function ExportButtons({ story, onGenerateAnother }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const plainText = formatStoryAsPlainText(story);
    const success = await copyToClipboard(plainText);
    
    if (success) {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    const markdown = formatStoryAsMarkdown(story);
    const filename = `user-story-${Date.now()}.md`;
    downloadMarkdown(markdown, filename);
    toast.success('Story downloaded!');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        onClick={handleCopy}
        variant="outline"
        className="flex-1"
        size="lg"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </>
        )}
      </Button>

      <Button
        onClick={handleDownload}
        variant="outline"
        className="flex-1"
        size="lg"
      >
        <Download className="mr-2 h-4 w-4" />
        Download as Markdown
      </Button>

      <Button
        onClick={onGenerateAnother}
        variant="secondary"
        className="flex-1"
        size="lg"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Generate Another
      </Button>
    </div>
  );
}
