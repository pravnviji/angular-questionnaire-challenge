import { createAction, props } from '@ngrx/store';
import { TQuestions } from '../feature/model/question';

export const loadQuestion = createAction('loadQuestion');

export const updatedQuestion = createAction(
  'updatedQuestion',
  props<{
    identifier: TQuestions['identifier'];
    questions: TQuestions;
  }>()
);

export const getAllQuestion = createAction('getAllQuestion');
