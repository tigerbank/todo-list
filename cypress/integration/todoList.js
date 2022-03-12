/// <reference types="cypress" />

describe('TodoApp', () => {
  it('rener Correctly', () => {
    cy.seedAndVisit();
    cy.findByText('Tasks').should('exist');
  });

  it('can add task', () => {
    cy.seedAndVisit();
    const newItem = 'Go gym';
    cy.route('POST', '/todos', {
      id: 'f242ea1c-5d38-445e-b3fd-9aded732f2a5',
      title: newItem,
      completed: false,
    });

    cy.get('#addTodo input').type(newItem).type('{enter}');
    cy.get('#taskLists li').last().should('have.text', newItem);
  });

  it('can mark as done', () => {
    cy.seedAndVisit();
    cy.route('PUT', '/todos/1', {
      completed: true,
    });
    cy.get('[data-testid="task-item-0"] input').check().should('be.checked');
  });

  it('can edit task', () => {
    const updatedTitle = 'Updated Task';
    cy.seedAndVisit();
    cy.route('PUT', '/todos/f619466c-a016-4281-b584-7db2795d103d', {
      title: updatedTitle,
    });
    cy.get('#taskLists li:nth-child(2) img').click();
    cy.get('#taskLists li:nth-child(2) .popover__edit').click();
    cy.get('[data-testid="task-item-2"]').click();
    cy.get('#taskLists li:nth-child(2) .tasks__inputEdit').clear();
    cy.get('#taskLists li:nth-child(2) .tasks__inputEdit').type('Updated task');
    cy.get('#taskLists li:nth-child(2) button').click();
    cy.get('[data-testid="task-item-1"]').should('have.text', 'Updated task');
  });

  it('can show progress', () => {
    cy.seedAndVisit();
    cy.route('PUT', '/todos/1', {
      completed: true,
    });
    cy.get('[data-testid="task-item-0"] input').check();
    cy.get('#progressCount').should('have.text', '2 completed');
  });

  it('can delete task', () => {
    cy.seedAndVisit();
    cy.route({
      method: 'DELETE',
      url: '/todos/1',
      status: 200,
      response: {},
    });
    cy.get('#taskLists li:nth-child(1) img').click();
    cy.get('#taskLists li:nth-child(1) .popover__delete').click();
    cy.on('window:confirm', () => true);
    cy.get('#taskLists li').should('have.length', 2);
  });

  it('can see what is done', () => {
    cy.seedAndVisit();
    cy.get('#filterTodoButton').click();
    cy.get('[data-testid="list-done"]').click();
    cy.get('#taskLists li').should('have.length', 1);
  });
  it('can see what is undone', () => {
    cy.seedAndVisit();
    cy.get('#filterTodoButton').click();
    cy.get('[data-testid="list-undone"]').click();
    cy.get('#taskLists li').should('have.length', 2);
  });
});
