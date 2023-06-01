import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Tasks from './components/Tasks';
import NewTask from './components/NewTask';

let divContainer: any;
beforeEach(() => {
  //attach the div
  divContainer = document.createElement('div');
  document.body.appendChild(divContainer);
});
afterEach(() => {
  //cleanup at exit
  unmountComponentAtNode(divContainer);
  divContainer.remove();
  divContainer = null;
});

it('rendered the newtask inputs', () => {
  act(() => {
    render(<NewTask />, divContainer);
  });
  expect(screen.getByRole('newTaskInput')).toBeInTheDocument();
  expect(screen.getByRole('newTaskCheckbox')).toBeInTheDocument();
  expect(screen.getByRole('newTaskTextarea')).toBeInTheDocument();
  expect(screen.getByRole('newTaskButton')).toBeInTheDocument();
});
