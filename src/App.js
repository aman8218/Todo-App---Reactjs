import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './TodoList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tasks" component={TodoList} />
      </Switch>
    </Router>
  );
}


export default App;
