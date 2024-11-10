import { doLogIn } from "../utils/util";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        doLogIn();
    });

    it("Escenario: Unpublish page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.screenshot('Before Unpublish');
        cy.get('span.gh-post-list-cta.edit').first().click(); //Click on Edit first page
        cy.location("hash").should("contains", "#/editor/page"); // check location


        cy.wait(500)
        cy.get('button[data-test-button="update-flow"]').contains('Unpublish').first().click(); // click en unpublish

        cy.wait(500)
        cy.get('div.epm-modal-container').within(() => {
            cy.get('button[data-test-button="revert-to-draft"]').first().click() // click en continuar
        })
        
        cy.wait(500)
        cy.get('div[data-test-editor-post-status=""]').contains('Draft');
        cy.screenshot('Set to draft state');
    });
   
});