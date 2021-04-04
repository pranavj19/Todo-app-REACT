import uuid from 'uuid';
export const ADD_NEW_TODO_TO_LIST = 'password/ADD_NEW_TODO_TO_LIST';
export const DELETE_NEW_TODO_TO_LIST = 'password/DELETE_NEW_TODO_TO_LIST';
export const UPDATE_NEW_TODO_TO_LIST = 'password/UPDATE_NEW_TODO_TO_LIST';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  requiredTodoList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TODO_TO_LIST: {
      return {
        ...state,
        requiredTodoList: [...state.requiredTodoList, {
          id: uuid(),
          ...action.payload
        }]
      };
    }
    case DELETE_NEW_TODO_TO_LIST: {
      return {
        ...state,
        requiredTodoList: action.payload
      };
    }
    case UPDATE_NEW_TODO_TO_LIST: {
      return {
        ...state,
        requiredTodoList: action.payload
      };
    }
    default:
      return state;
  }
};
