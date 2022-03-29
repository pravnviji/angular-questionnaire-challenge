import { Action, createReducer, on } from '@ngrx/store';
import { TQuestionnaire, TQuestions } from '../feature/model/question';
import { getAllQuestion, loadQuestion, updatedQuestion } from './actions';

function getInitialQuestion(): TQuestions[] {
  return localStorage.getItem('questionData') !== null
    ? (JSON.parse(
        localStorage.getItem('questionData') as string
      ) as TQuestions[])
    : [];
}

const initialState: TQuestionnaire = {
  questions: getInitialQuestion(),
  id: 0,
  identifier: '',
  name: '',
  description: '',
  category_name_hyphenated: '',
};

const _questionReducer = createReducer(
  initialState,
  on(getAllQuestion, (state, actions) => {
    return {
      ...state,
      questions: state.questions,
      actions,
    };
  }),
  on(updatedQuestion, (state: any, actions) => {
    let updateQuestion = postQuestion(state, actions);
    return {
      ...state,
      questions: [...state.questions, updateQuestion],
      actions,
    };
  })
);

export const postQuestion = (state: any, actions: any) => {
  let updateQuestion = null;
  if (state.questions.length === 0) {
    updateQuestion = actions.questions;
  } else {
    const questionIdentifier = state.questions.find(
      (element: TQuestions) => element.identifier == actions.identifier
    );
    if (questionIdentifier) {
      updateQuestion = state.questions.map((question: TQuestions) => {
        return question.identifier === actions.identifier
          ? actions.questions
          : question;
      });
    } else {
      updateQuestion = actions.questions;
    }
  }
  return updateQuestion;
};

export function questionReducer(
  state: TQuestionnaire | undefined,
  action: Action
) {
  return _questionReducer(state, action);
}
