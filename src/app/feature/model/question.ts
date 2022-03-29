export type TQuestionnaire = {
  id: number;
  identifier: string;
  name: string;
  questions: TQuestions[];
  description: string;
  category_name_hyphenated: string;
};

export type TQuestions = {
  question_type: string;
  value?: any;
  identifier: string;
  headline: string;
  multiline?: string;
  required?: boolean;
  description?: string | null;
  choices?: TChoices[];
  jumps?: TJump[];
  count?: number;
};

export type TChoices = {
  label: string;
  value: string;
  selected: boolean;
};

export type TJump = {
  conditions: TConditions[];
  desitination: TDesitination;
};

export type TConditions = {
  field: string;
  value: string;
};

export type TDesitination = {
  id: string;
};
