Cypress.Commands.add('addTodo', (text) => {
  cy.get('.new-todo').type(`${text}{enter}`, { parseSpecialCharSequences: false });
});
