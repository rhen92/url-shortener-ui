describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      "urls": [{
        "id": 1,
        "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
        "short_url": "http://localhost:3001/useshorturl/1",
        "title": "Abstract Art"
      }]
    }
    )
    cy.visit('http://localhost:3000')
  })

  it('should display the title', () => {
    cy.contains('h1', 'URL Shortener')
  })

  it('should display loading message', () => {
    cy.get('p').contains('No urls yet! Find some to shorten!')
  })

  it('should display existing shortened urls', () => {
    cy.wait(1000)
      .get('div').eq(1)
      .get('h3').contains('Abstract Art')
      .get('a').contains('http://localhost:3001/useshorturl/1')
      .should('have.attr', 'href', 'http://localhost:3001/useshorturl/1')
      .should('have.attr', 'target', 'blank')
      .get('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('should display the form', () => {
    cy.get('form')
      .get('form input[name="title"]').should('have.attr', 'placeholder', 'Title...')
      .get('form input[name="long_url"]').should('have.attr', 'placeholder', 'URL to Shorten...')
      .get('button').contains('Shorten Please!')
  })

  it('should reflect information typed in input fields', () => {
    cy.get('form input[name="title"]').type('Cute dog')
      .get('form input[name="title"]').invoke('val').should('eq', 'Cute dog')
      .get('form input[name="long_url"]').type('https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo')
      .get('form input[name="long_url"]').invoke('val').should('eq', 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo')
  })

  it('should add new url after submitting form', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 2,
        long_url: 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo',
        short_url: 'http://localhost:3001/useshorturl/2',
        title: 'Cute dog'
      }
    })
    cy.get('form input[name="title"]').type('Cute dog')
      .get('form input[name="long_url"]').type('https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo')
      .get('button').click()
      .get('div').eq(1)
      .get('h3').eq(0).contains('Cute dog')
      .get('a').eq(0).contains('http://localhost:3001/useshorturl/2')
      .should('have.attr', 'href', 'http://localhost:3001/useshorturl/2')
      .should('have.attr', 'target', 'blank')
      .get('p').eq(0).contains('https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo')
  })
})
