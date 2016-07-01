import { callMethodPromise } from '../../helpers/helperPromises';

import { Meteor } from 'meteor/meteor';

export function createTodo(text){
  return dispatch => {
    callMethodPromise('addTodo', text)
      .then(data=> dispatch(getAllTodos()))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error,
        });
      });
  };
};

export function setTodos(todos){
  return {
    type: 'SET_TODOS',
    todos
  }
}

export function getAllTodos(){
  return dispatch => {
    callMethodPromise('getAllTodos')
      .then(todos=> dispatch(setTodos(todos)))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error
        });
      })
  }
}
