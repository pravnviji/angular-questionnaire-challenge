import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TQuestionnaire } from '../feature/model/question';

const getQuestionState = createFeatureSelector<TQuestionnaire>('questionStore');

export const getQuestion = createSelector(
  getQuestionState,
  (state: TQuestionnaire) => {
    console.log('getQuestion');
    console.log(state);
    return state.questions;
  }
);
