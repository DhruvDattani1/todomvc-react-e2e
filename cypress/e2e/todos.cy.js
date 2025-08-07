// cypress/e2e/todos.cy.js
describe('TodoMVC App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('adds a todo', () => {
    cy.get('.new-todo').type('Learn Cypress{enter}');
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li').first().should('contain', 'Learn Cypress');
  });

  it('marks a todo as completed', () => {
    cy.get('.new-todo').type('Write tests{enter}');
    cy.get('.todo-list li').first().find('.toggle').check();
    cy.get('.todo-list li').first().should('have.class', 'completed');
  });

  it('deletes a todo', () => {
    cy.get('.new-todo').type('Remove me{enter}');
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li').first().find('.destroy').invoke('show').click();
    cy.get('.todo-list li').should('have.length', 0);
  });

});
