import React, { Component } from 'react';

// import TodoInput from './TodoInput';
// import TodoList from './TodoList';
import TodoInputContainer from '../../containers/TodoInputContainer';
import TodoListContainer from '../../containers/TodoListContainer';

import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TodoList = () => {
    return (
        <div className={cx('page-template')}>
            <h1>일정 관리</h1>
            <div className={cx('content')}>
                <TodoInputContainer/>
                <TodoListContainer/>
            </div>
        </div>
    );
};
export default TodoList;