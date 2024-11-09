const BASE_URL = "http://localhost:8080";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
    });


    beforeEach(()=>{
    cy.visit(BASE_URL + '/ghost/#/signin');
    cy.get('a[title="Dashboard"]').should('be.visible');
    });

    it("Escenario: Create new page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.get('a[data-test-new-page-button=""]').click(); //Click on New Page
        cy.location("hash").should("equal", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/*", {}).as("createPage");

        // Set content
        cy.get('textarea[data-test-editor-title-input=""]').type("A New Page by Cypress")
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(" To live is to risk it all, otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.")

        cy.wait(1000)

        cy.get('button[data-test-button="publish-flow"]').first().click(); // click en publicar

        cy.wait(500)
        cy.get('div.epm-modal-container').within(() => {
            cy.get('button[data-test-button="continue"]').first().click() // click en continuar
            cy.get('span[data-test-task-button-state="idle"]').first().click(); //click en confirmar
        })

        cy.wait(500)
        cy.screenshot('New Page')
    });

    it("Escenario: Create empty page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.get('a[data-test-new-page-button=""]').click(); //Click on New Page
        cy.location("hash").should("equal", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

        // Set content
        cy.get('textarea[data-test-editor-title-input=""]').type("A New Page by Cypress")
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(" To live is to risk it all, otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.")

        cy.wait(500)

        cy.get('textarea[data-test-editor-title-input=""]').clear();
        cy.get('div[data-placeholder="Begin writing your post..."]').clear();    

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

    it("Escenario: Edit page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.screenshot('Before Edit');
        cy.get('span.gh-post-list-cta.edit').click(); //Click on Edit first page
        cy.location("hash").should("equal", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

        // Set new content
        cy.get('textarea[data-test-editor-title-input=""]').type("Edited Page")
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(" Edited with cypress. by nf.ortiz 😊")

        cy.wait(500)

        cy.get('span[data-test-task-button-state="idle"]').first().click(); // click en update

        cy.wait(500)
        cy.get('aside.gh-notifications').screenshot("edit notification");

        cy.wait(500)
        cy.get('a[data-test-link="pages"]').first().click();    
    });

    it("Escenario: Unpublish page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.screenshot('Before Unpublish');
        cy.get('span.gh-post-list-cta.edit').click(); //Click on Edit first page
        cy.location("hash").should("equal", "#/editor/page"); // check location


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


    it("Escenario: Delete page", () => {
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.screenshot('Before DElete');
        cy.get('span.gh-post-list-cta.edit').click(); //Click on Edit first page
        cy.location("hash").should("equal", "#/editor/page"); // check location

        cy.get('button.settings-menu-toggle').first().click(); // click en menu lateral
        cy.get('button[data-test-button="delete-post"]').first().click(); // click on delete button

        cy.wait(500)
        cy.get('div.epm-modal-container').within(() => {
            cy.get('button[data-test-button="delete-post-confirm"]').contains('Delete').click() // click en delete
        })

        cy.wait(500)
        cy.screenshot('DELETE PAGE')
    });
})

function doLogIn() {

}
