import React from 'react';

let enterKeyCode = 13;

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoName: ''
    };
  }

  onChange(e) {
    this.setState({ newTodoName: e.target.value });
  }

  onKeyDown(e) {
    if (e.keyCode == enterKeyCode) {
      this.props.onAddTodo(this.state.newTodoName);
      this.state.newTodoName = '';
    }
  }

  onCheck(todo) {
    let updatedTodo = {
      ...todo,
      percent_complete: (todo.percent_complete == 100 ? 0 : 100)
    };

    this.props.onUpdateTodo(updatedTodo);
  }

  render() {
    if (!this.props.todos) { return (<div />); }

    return (
      <div className='todo-list'>
        <ul>
          {_.map(this.props.todos, todo => {
            return (
              <li key={todo.id || todo.key}>
                <div className={`checkbox ${todo.percent_complete == 100 && 'checked'}`} onClick={_.partial(this.onCheck.bind(this), todo)}>
                  {todo.percent_complete == 100 ? 'checked' : 'unchecked'}
                </div>
                {todo.name}
              </li>
            );
          })}
        </ul>

        <input type='text' ref='newTodo' value={this.state.newTodoName} onChange={this.onChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)} placeholder='Add a todo' />
      </div>
    );
  }
};

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string
  })),
  onAddTodo: React.PropTypes.func,
  onUpdateTodo: React.PropTypes.func
};
