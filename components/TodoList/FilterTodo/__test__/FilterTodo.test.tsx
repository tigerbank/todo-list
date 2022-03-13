import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FilterTodo from '@/components/TodoList/FilterTodo';

describe('FilterTodo', () => {
  let expectedProps: any;

  beforeEach(() => {
    expectedProps = {
      onClickOutside: jest.fn(),
    };
    render(<FilterTodo {...expectedProps} />);
  });

  it('Renders Button', () => {
    const button = screen.getByRole('button', { name: 'All' });
    expect(button).toBeInTheDocument();
  });

  it('Renders All, Done, Undone', () => {
    const button = screen.getByRole('button', { name: 'All' });
    fireEvent.click(button);

    const all = screen.getByTestId('list-all');
    const done = screen.getByTestId('list-done');
    const undone = screen.getByTestId('list-undone');

    expect(all).toBeInTheDocument();
    expect(done).toBeInTheDocument();
    expect(undone).toBeInTheDocument();
  });
});
