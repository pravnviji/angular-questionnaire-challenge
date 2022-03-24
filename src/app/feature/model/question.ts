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
  identifier: string;
  headline: string;
  multiline: boolean;
  required: boolean;
  choices: TChoices[];
  jump: TJump[];
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
