import { z } from 'zod';

export const generateStorySchema = z.object({
  userInput: z.string().min(10, 'Please provide at least 10 characters'),
  role: z.string().optional(),
  context: z.string().optional(),
  criteriaFormat: z.enum(['given-when-then', 'bullet', 'both']),
});

export type GenerateStoryInput = z.infer<typeof generateStorySchema>;

export const acceptanceCriterionSchema = z.object({
  id: z.string(),
  type: z.enum(['given-when-then', 'bullet']),
  given: z.string().optional(),
  when: z.string().optional(),
  then: z.string().optional(),
  description: z.string().optional(),
});

export const investScoreSchema = z.object({
  independent: z.boolean(),
  negotiable: z.boolean(),
  valuable: z.boolean(),
  estimable: z.boolean(),
  small: z.boolean(),
  testable: z.boolean(),
});

export const userStorySchema = z.object({
  role: z.string(),
  goal: z.string(),
  benefit: z.string(),
  acceptanceCriteria: z.array(acceptanceCriterionSchema),
  investScore: investScoreSchema,
});
