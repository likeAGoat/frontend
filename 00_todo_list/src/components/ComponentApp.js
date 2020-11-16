import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
// import TodoInput from './TodoInput';
// import TodoList from './TodoList';
import TodoInputContainer from '../containers/TodoInputContainer';
import TodoListContainer from '../containers/TodoListContainer';

const ComponentApp = () => {
  return (
    <PageTemplate>
      <TodoInputContainer/>
      <TodoListContainer/>
    </PageTemplate>
  );
};

export default ComponentApp;
