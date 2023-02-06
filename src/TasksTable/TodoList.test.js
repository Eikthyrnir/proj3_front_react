import React from 'react';
import ReactDOM from 'react-dom';
import TasksTable from './TasksTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TasksTable />, div);
});
