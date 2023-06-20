
describe('My Homepage link Test', () => {
  it('clicking "here" navigates to a new url', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('here').click()

    cy.url().should('include', '/sessions')
  })
})

describe('My Homepage button Test', () => {
  it('clicking "News!" navigates to a new url', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('News!').click()

    cy.url().should('include', '/news')
  })
})

describe('My Newspage button Test', () => {
  it('clicking "Add new post!" navigates to a new url', () => {
    cy.visit('http://localhost:3000/news')

    cy.contains('Add new post!').click()

    cy.url().should('include', '/form')
  })
})

describe('My Formpage Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://localhost:3000/form')

    cy.get('#title').type('faketitle')

    cy.get('#title').should('have.value', 'faketitle')

    cy.get('#author').type('fakeauthor')

    cy.get('#author').should('have.value', 'fakeauthor')

    cy.get('#content').type('fakecontent')

    cy.get('#content').should('have.value', 'fakecontent')
  })
})