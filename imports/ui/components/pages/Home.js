import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Todos from '../../../api/collections/todos';
import AddTodoForm from '../AddTodoForm';
import  { createTodo, getAllTodos } from '../../actions/actions';

class Home extends Component {
  componentWillMount() {
    //this.props.subscribe('allTodos');
    console.log(this.props);
    this.props.getAllTodos();
  }
  render(){
    let { form, submitHandler, serverError, todos } = this.props;
    return (
      <div className="home">
        <div className="notifier">
          {serverError.error ? <div className="server-error">{serverError.error.reason}</div> : "" }
          <ul>
            {todos.map((todo, i )=> <li key={i}>{todo.text}</li>)}
          </ul>
        </div>
        <AddTodoForm onSubmit={submitHandler.bind(null, form)} />
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    serverError: state.serverError,
    todos: state.todos,
    form: state.form.addTodoForm
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (form) => {
      dispatch(createTodo(form.text.value.toLowerCase()))
    },
    getAllTodos: () => {
      dispatch(getAllTodos())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
