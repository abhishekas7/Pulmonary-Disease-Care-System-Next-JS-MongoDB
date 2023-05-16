describe('My Next.js App', () => {
    it('successfully loads', () => {
      cy.visit('/') // Replace '/' with the URL of your Next.js app
  
      // Make assertions based on your app's behavior
      cy.contains('Welcome to my Next.js app') // Replace with the expected text on your page
      cy.get('button').click() // Replace 'button' with a valid selector for your button element
      cy.url().should('include', '/login') // Replace '/login' with the expected URL after clicking the button
    })
  
    // Add more tests as needed...
  })
  