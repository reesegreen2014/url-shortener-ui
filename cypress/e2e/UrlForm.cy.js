describe('URL Shortener Form', () => {
    beforeEach(() => {
        cy.fixture('urls').then((urls) => {
            cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
                statusCode: 200,
                body: urls
            }).as('getUrls');
        });

        cy.visit('http://localhost:3000')
    });

    it('should reflect the values that a user enters in the form', () => {
        cy.get('[placeholder="Title..."]').type('Testing from Cypress...').should('have.value', 'Testing from Cypress...')
        cy.get('[placeholder="URL to Shorten..."]').type('www.fakeurl.com/testingherehello').should('have.value', 'www.fakeurl.com/testingherehello')
    });

    it('should add the shortened url to page when form is submitted', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
            statusCode: 201,
            body: {
                id: 10,
                title: 'Testing from Cypress...',
                long_url: 'www.fakeurl.com/testingherehello',
                short_url: 'http://localhost:3001/useshorturl/5'
            }
        }).as('postUrls')

        cy.get('[placeholder="Title..."]').type('Testing from Cypress...').should('have.value', 'Testing from Cypress...');
        cy.get('[placeholder="URL to Shorten..."]').type('www.fakeurl.com/testingherehello').should('have.value', 'www.fakeurl.com/testingherehello');
        cy.get('button').click();
        cy.get('section > :nth-child(5)').should('exist');
        cy.get(':nth-child(5) > h3').should('contain', 'Testing from Cypress...')
        cy.get(':nth-child(5) > a').should('contain', 'http://localhost:3001/useshorturl/5');
        cy.get(':nth-child(5) > p').should('contain', 'www.fakeurl.com/testingherehello')
      });
    });