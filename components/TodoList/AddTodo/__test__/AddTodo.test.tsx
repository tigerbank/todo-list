import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodo from '@/components/TodoList/AddTodo';

describe('AddTodo', () => {
  it('renders Input', () => {
    render(<AddTodo />);
    const inputText = screen.getByPlaceholderText('Add your todo...');
    expect(inputText).toBeInTheDocument();
  });

  it('Should be able to type input', () => {
    render(<AddTodo />);
    const inputText = screen.getByPlaceholderText('Add your todo...');
    fireEvent.change(inputText, { target: { value: 'Hello World' } });
    expect(inputText).toHaveValue('Hello World');
  });

  it('Should be empty when enter', () => {
    render(<AddTodo />);
    const inputText = screen.getByPlaceholderText('Add your todo...');
    fireEvent.keyPress(inputText, { key: 'Enter', code: 13 });
    expect(inputText).toHaveValue('');
  });
});
