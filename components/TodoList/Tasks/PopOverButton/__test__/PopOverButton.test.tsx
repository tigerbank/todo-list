import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PopOverButton from '@/components/TodoList/Tasks/PopOverButton';

describe('FilterTodo', () => {
  let expectedProps: any;

  const todoList = {
    id: 'abc-el',
    title: 'Hello World',
    completed: false,
  };

  beforeEach(() => {
    expectedProps = {
      todoList,
      handleEdit: jest.fn(),
      onClickOutside: jest.fn(),
    };
    render(<PopOverButton {...expectedProps} />);
  });

  it('Renders Button', () => {
    const button = screen.getByAltText('button');
    expect(button).toBeInTheDocument();
  });

  it('should show edit and delete link', () => {
    const button = screen.getByAltText('button');
    fireEvent.click(button);
    const editButton = screen.getByText('Edit');
    const deleteButton = screen.getByText('Delete');
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
