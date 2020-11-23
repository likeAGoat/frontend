import React, { Component } from 'react';
import PageTemplate from '../pages';

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
