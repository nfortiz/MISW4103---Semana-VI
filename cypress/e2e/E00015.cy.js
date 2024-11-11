import {    
    CONTENT, 
    doLogIn
} from "../utils/pages";
const BASE_URL = "http://localhost:2368";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        doLogIn();
    });

   
    it("Escenario: Delete page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.screenshot('Before Delete');
        cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        cy.get('button.settings-menu-toggle').first().click(); // click en menu lateral
        cy.get('button[data-test-button="delete-post"]').first().click(); // click on delete button

        cy.wait(500)
        cy.get('div.epm-modal-container').within(() => {
            cy.get('button[data-test-button="delete-post-confirm"]').contains('Delete').click() // click en delete
        })

        cy.wait(500)
        cy.screenshot('DELETE PAGE')
    });
});