describe('URL Shortener App', () => {
    beforeEach(() => {
        cy.fixture('urls').then((urls) => {
            cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
                statusCode: 200,
                body: urls
            }).as('getUrls')
        });

        cy.visit('http://localhost:3000')
    });

    it ('should display the page title, the form and the existing shortened URLs', () => {
        cy.get('h1').should('contain', 'URL Shortener');
        cy.get('form').should('exist');
        cy.get('[placeholder="Title..."]').should('exist');
        cy.get('[placeholder="URL to Shorten..."]').should('exist')
        cy.get('button').should('exist')
        cy.get('section > :nth-child(1)').should('exist');
        cy.get('section > :nth-child(2)').should('exist');
        cy.get('section > :nth-child(3)').should('exist');
        cy.get('section > :nth-child(4)').should('exist');
        cy.get(':nth-child(1) > h3').should('contain', 'Test 1');
        cy.get(':nth-child(1) > a').should('contain', 'http://localhost:3001/useshorturl/2')
        cy.get(':nth-child(1) > p').should('contain', 'www.thankyou.com/fsdogjrionwrnslbknegs')
    })
})