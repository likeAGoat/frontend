import React, { Component } from 'react';
import TodoItem from '../TodoItem';

class TodoList extends Component {

  //props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드입니다. 컴포넌트를 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 언제나 true값을 반환
  //이 메서드가 false값을 반환한다면 업데이트 과정은 여기에서 중지됩니다.
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
