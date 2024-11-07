Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

beforeEach(()=>{
   cy.visit('http://localhost:8080/ghost/#/signin');
   cy.get('a[title="Dashboard"]').should('be.visible');
});

it("Create new post", () => {
    cy.get('a[data-test-new-page-button=""]').click(); //Click on New Page
    cy.location("hash").should("equal", "#/editor/post");


    cy.get('textarea[placeholder="Post title"]').type(title).screenshot("post title")
    cy.get('div[data-placeholder="Begin writing your post..."]').type(content).screenshot("post body")

    cy.wait(500);
    cy.location("hash").should("include", "#/editor/post/");

    cy.get("div.gh-publishmenu").click(); // click en publicar
    cy.get('div').contains('Publish').click()

});