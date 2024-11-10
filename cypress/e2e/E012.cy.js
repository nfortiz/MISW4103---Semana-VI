import { doLogIn } from "../utils/util";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        doLogIn();
    });

    it("Escenario: Create empty page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.get('a[data-test-new-page-button=""]').click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

        // Set content
        cy.get('textarea[data-test-editor-title-input=""]').type("A New Page by Cypress")
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(" To live is to risk it all, otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.")

        cy.wait(500)

        cy.get('textarea[data-test-editor-title-input=""]').clear();
        cy.get('p[data-koenig-dnd-droppable="true"]').first().clear();    

        cy.wait(500)

        cy.get('button[data-test-button="publish-flow"]').first().click(); // click en publicar

        cy.wait(500)
        cy.get('div.epm-modal-container').within(() => {
            cy.get('button[data-test-button="continue"]').first().click() // click en continuar
            cy.get('span[data-test-task-button-state="idle"]').first().click(); //click en confirmar
        })

        cy.wait(500)
        cy.screenshot('New Page')
    });
});