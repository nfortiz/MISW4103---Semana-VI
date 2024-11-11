import { doLogIn, CONTENT } from "../utils/pages";
const BASE_URL = "http://localhost:2368";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        doLogIn();
    });

    it("Escenario: Create new page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/*", {}).as("createPage");

        // Set content
        cy.get(CONTENT.pageTitleInput).type("A New Page by Cypress")
        cy.get(CONTENT.pageContentInput).first().type(" To live is to risk it all, otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.")

        cy.wait(1000)

        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500)
        cy.get(CONTENT.newPageModal).within(() => {
            cy.get(CONTENT.continueCreationPageButton).first().click() // click en continuar
            cy.get(CONTENT.confirmCreationPageButton).first().click(); //click en confirmar
        })

        cy.wait(500)
        cy.screenshot('New Page')
    });
});