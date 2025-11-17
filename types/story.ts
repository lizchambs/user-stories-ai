export interface AcceptanceCriterion {
  id: string;
  type: 'given-when-then' | 'bullet';
  given?: string;
  when?: string;
  then?: string;
  description?: string;
}

export interface InvestScore {
  independent: boolean;
  negotiable: boolean;
  valuable: boolean;
  estimable: boolean;
  small: boolean;
  testable: boolean;
}

export interface UserStory {
  role: string;
  goal: string;
  benefit: string;
  acceptanceCriteria: AcceptanceCriterion[];
  investScore: InvestScore;
}

export interface GenerateStoryRequest {
  userInput: string;
  role?: string;
  context?: string;
  criteriaFormat: 'given-when-then' | 'bullet' | 'both';
}

export interface GenerateStoryResponse {
  success: boolean;
  story?: UserStory;
  error?: string;
}
