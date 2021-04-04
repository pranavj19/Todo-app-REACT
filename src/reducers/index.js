import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import todoList from './todolist';

const appReducer = combineReducers({
  // form: formReducer,
  todoList,
});

// Setup root reducer
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
