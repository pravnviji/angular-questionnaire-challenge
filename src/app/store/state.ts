import { TQuestionnaire, TQuestions } from '../feature/model/question';
import { questionReducer } from './reducer';

export type TAppState = {
  questionState: TQuestionnaire;
};

export const appReducer = {
  questionStore: questionReducer,
};
