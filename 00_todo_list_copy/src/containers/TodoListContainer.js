import React, { Component } from 'react';
import TodoList from '../components/TodoList';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//액션 생성 함수들을 한꺼번에 불러옵니다.
import * as todosActions from '../modules/todos';


class TodoListContainer extends Component {
    //필요한 메서드들을 구현하고 props를 TodoList에 전달해 보자
    handleToggle = (id) =>{
        const {TodosActions} = this.props;
        TodosActions.toggle(id);
    }
    handleRemove = (id) => {
        const {TodosActions} = this.props;
        TodosActions.remove(id);
    }
    render() {
        const {todos} = this.props;
        const { handleToggle, handleRemove } = this;

        return (
            <TodoList
                todos={todos}
                onToggle={handleToggle}
                onRemove={handleRemove}/>
        );
    }
}

//컴포넌트에 리덕스의 상태와 액션 생성 함수들을 연결해 보겠습니다.
export default connect(
    (state) => ({
        todos: state.todos
    }),
    (dispatch) => ({
        TodosActions: bindActionCreators(todosActions,dispatch)
    })
)(TodoListContainer)