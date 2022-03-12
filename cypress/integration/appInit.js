/// <reference types="cypress" />

describe('App Initalization', () => {
  it('Load todo on page load', () => {
    cy.seedAndVisit();
    cy.get('#taskLists li').should('have.length', 3);
  });

  it('display error when api fail', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/todos',
      status: 500,
      response: {},
    });
    cy.visit('/');
    cy.get('#message').should('have.text', 'Opps! Something went wrong');
  });
});
