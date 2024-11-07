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
    cy.visit(BASE_URL + 'ghost/#/pages/')
    cy.get('a[data-test-new-page-button=""]').click(); //Click on New Page
    cy.location("hash").should("equal", "#/editor/page"); // check location

    cy.get('textarea[data-test-editor-title-input=""]').type("A title")
    cy.get('div[data-placeholder="Begin writing your post..."]').type(" To live is to risk it all, otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.")

    cy.wait(500);
    cy.location("hash").should("include", "#/editor/post/");

    cy.get('button[data-test-button="publish-flow"]').click(); // click en publicar
    cy.get('div').contains('Publish').click()

    cy.wait(500)
    cy.get('div.epm-modal-container').within(() => {
        cy.get('button[data-test-button="continue"]').contains('Publish').click()
    })
    cy.wait(500)
    cy.screenshot('Publicado')

});

it("Create empty page", () => {
    cy.location("hash").should("equal", "#/pages");
    cy.get('a[title="New post"]').click(); // Ecntra el crear publicacion
    cy.location("hash").should("equal", "#/editor/post");

    cy.get("textarea.gh-editor-title").click(); // Click en el titulo
    cy.get("div.koenig-editor__editor-wrapper").click();

    cy.wait("@createPost");
    cy.location("hash").should("include", "#/editor/post/");

    cy.get("div.gh-publishmenu").click(); // click en publicar
    cy.get("button#ember96").click(); // Clic en publicar
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
