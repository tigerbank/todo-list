import '@testing-library/cypress/add-commands';

Cypress.Commands.add('seedAndVisit', () => {
  cy.server();
  cy.route('GET', '/todos', 'fixture:todos');
  cy.visit('/');
});
