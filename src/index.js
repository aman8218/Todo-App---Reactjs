import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>
);