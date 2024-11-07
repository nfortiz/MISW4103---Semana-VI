Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

beforeEach(()=>{
    cy.visit('http://localhost:8080/ghost/#/signin')
    cy.wait("@login");
    cy.get('a[data-test-nav="pages"]').click()
})

it("Create new post", () => {
    cy.get('a[data-test-new-page-button=""]').click(); //Click on New Page
    cy.location("hash").should("equal", "#/editor/post");

    cy.intercept("POST", "/ghost/api/canary/admin/posts/", {}).as("createPost");

    cy.get("textarea.gh-editor-title").click(); // Click en el titulo
    cy.get("div.koenig-editor__editor-wrapper").click();

    cy.wait("@createPost");
    cy.location("hash").should("include", "#/editor/post/");

    cy.get("div.gh-publishmenu").click(); // click en publicar
    cy.get("button#ember96").click(); // Clic en publicar
});