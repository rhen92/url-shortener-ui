describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      "urls": [{
        "id": 1,
        "long_url": "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo",
        "short_url": "http://localhost:3001/useshorturl/1",
        "title": "Cute Dog"
      }]
    }
    )
    cy.visit('http://localhost:3000')
  })

})
