import React, { Component } from 'react';
import TodoItem from '../TodoItem';

class TodoList extends Component {

  //shouldComponentUpdate!!! 공부하기
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const {todos, onToggle, onRemove } = this.props;
    //Map들로 구성된 List 형태의 객체를 전달했으니 이에 맞추어서 코드를 수정해야합니다.
    const todoList = todos.map(
      todo => (
        <TodoItem
          key={todo.get('id')}
          done={todo.get('done')}
          onToggle={() => onToggle(todo.get('id'))}
          onRemove={() => onRemove(todo.get('id'))}>
          {todo.get('text')}
        </TodoItem>
      )
    );

    return (
      <div>
        {todoList}
      </div>
    );
  }

}

export default TodoList;
