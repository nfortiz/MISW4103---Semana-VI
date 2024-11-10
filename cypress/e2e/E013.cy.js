import { doLogIn } from "../utils/util";
const BASE_URL = "http://localhost:2368";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        doLogIn();
    });

    it("Escenario: Edit page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.screenshot('Before Edit');
        cy.get('span.gh-post-list-cta.edit').first().click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

        // Set new content
        cy.get('textarea[data-test-editor-title-input=""]').type("Edited Page")
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(" Edited with cypress. by nf.ortiz 😊")

        cy.wait(1000)

        cy.get('span[data-test-task-button-state="idle"]').first().click(); // click en update

        cy.wait(500)
        cy.get('aside.gh-notifications').screenshot("edit notification");

        cy.wait(500)
        cy.get('a[data-test-link="pages"]').first().click();    
    });
});