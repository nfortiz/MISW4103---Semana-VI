Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const BASE_URL = "http://localhost:8080";

beforeEach(()=>{
   cy.visit(BASE_URL + '/ghost/#/signin');
   cy.get('a[title="Dashboard"]').should('be.visible');
});

it("Create new page", () => {
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

it("Create empty page", () => {
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

    cy.get('button[data-test-button="publish-flow"]').click(); // click en publicar

    cy.wait(500)
    cy.get('div.epm-modal-container').within(() => {
        cy.get('button[data-test-button="continue"]').first().click() // click en continuar
        cy.get('span[data-test-task-button-state="idle"]').first().click(); //click en confirmar
    })

    cy.wait(500)
    cy.screenshot('New Page')
});

it("Edit page", () => {
    cy.visit(BASE_URL + '/ghost/#/pages/')
    cy.screenshot('Before Edit');
    cy.get('span.gh-post-list-cta.edit').click(); //Click on New Page
    cy.location("hash").should("equal", "#/editor/page"); // check location

    cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

    // Set content
    cy.get('textarea[data-test-editor-title-input=""]').type("Edited Page")
    cy.get('div[data-placeholder="Begin writing your post..."]').type(" It is unsafe to chain further commands that rely on the subject afte.")

    cy.get('textarea[data-test-editor-title-input=""]').clear();
    cy.get('div[data-placeholder="Begin writing your post..."]').clear();    

    cy.wait("@createPage")

    cy.get('button[data-test-button="publish-flow"]').click(); // click en publicar

    cy.wait(500)
    cy.get('div.epm-modal-container').within(() => {
        cy.get('button[data-test-button="continue"]').contains('Publish').click() // click en continuar
        cy.get('span[data-test-task-button-state="idle"]').click(); //click en confirmar
    })

    cy.wait(500)
    cy.screenshot('New Page')
});

it("Unpublish page", () => {
    cy.visit(BASE_URL + '/ghost/#/pages/')
    cy.screenshot('Before Edit');
    cy.get('span.gh-post-list-cta.edit').click(); //Click on New Page
    cy.location("hash").should("equal", "#/editor/page"); // check location

    cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

    // Set content
    cy.get('textarea[data-test-editor-title-input=""]').type("Edited Page")
    cy.get('div[data-placeholder="Begin writing your post..."]').type(" It is unsafe to chain further commands that rely on the subject afte.")

    cy.get('textarea[data-test-editor-title-input=""]').clear();
    cy.get('div[data-placeholder="Begin writing your post..."]').clear();    

    cy.wait("@createPage")

    cy.get('button[data-test-button="update-flow"]').click(); // click en unpublish

    cy.wait(500)
    cy.get('div.epm-modal-container').within(() => {
        cy.get('button[data-test-button="continue"]').contains('Publish').click() // click en continuar
        cy.get('span[data-test-task-button-state="idle"]').click(); //click en confirmar
    })

    cy.wait(500)
    cy.screenshot('New Page')
});


it("Delete page", () => {
    cy.visit(BASE_URL + 'ghost/#/pages/')
    cy.get('a[data-test-new-page-button=""]').click(); //Click on New Page
    cy.location("hash").should("equal", "#/editor/page"); // check location

    cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

    // Set content
    cy.get('textarea[data-test-editor-title-input=""]').type("A New Page by Cypress")
    cy.get('div[data-placeholder="Begin writing your post..."]').type(" To live is to risk it all, otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.")

    cy.get('textarea[data-test-editor-title-input=""]').clear();
    cy.get('div[data-placeholder="Begin writing your post..."]').clear();    

    cy.wait("@createPage")

    cy.get('button[data-test-button="publish-flow"]').click(); // click en publicar

    cy.wait(500)
    cy.get('div.epm-modal-container').within(() => {
        cy.get('button[data-test-button="continue"]').contains('Publish').click() // click en continuar
        cy.get('span[data-test-task-button-state="idle"]').click(); //click en confirmar
    })

    cy.wait(500)
    cy.screenshot('New Page')
});


  function createPage(title, content) {
    cy.visit(BASE_URL + 'ghost/#/pages/')
    cy.get('a[data-test-new-page-button=""]').click(); 
    cy.wait(100)
    cy.get('textarea[placeholder="Post title"]').type(title)
    cy.get('div[data-placeholder="Begin writing your post..."]').type(content)
    cy.wait(700)
    cy.screenshot('filled post creation form')
    cy.get('div').contains('Publish').click()
    cy.wait(700)
    cy.screenshot('filled post creation form 2')
    cy.get('button').contains('Publish').click()
    cy.get('.modal-content').within(() => {
        cy.get('button').contains('Publish').click()
    })
    cy.wait(700)
    cy.screenshot('Publishing')
    cy.get('.gh-notification-title').should("have.text", "Published")
    cy.get('a').contains('View Post').invoke('attr', 'href').then((attr) => {+attr}).as('postUrl');
    cy.screenshot('Published')
    cy.get('button[class="gh-notification-close"]').click()
}
