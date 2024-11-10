export class TagPage {
  static getTitleSection() {
    return cy.get("a.active.ember-view").should("be.visible");
  }

  static clickNewTag() {
    return cy
      .get('[class="ember-view gh-btn gh-btn-primary"]')
      .click({ force: true });
  }

  static writeNameTag(name) {
    return cy.get("#tag-name").clear().type(name);
  }

  static clickDescriptionTag() {
    return cy.get("#tag-description").click({ force: true });
  }
  static writeDescriptionTag(description) {
    return cy.get("#tag-description").clear().type(description);
  }

  static clickNewTagSave() {
    return cy.get('[data-test-button="save"]').click({ force: true });
  }

  static clickDeleteTag() {
    return cy.get('[data-test-button="delete-tag"]').click({ force: true });
  }

  static clickDeleteConfirmTag() {
    return cy.get('[data-test-button="confirm"]').click({ force: true });
  }

  static lastTagCreated(name, flag) {
    // Obteniendo todos los enlaces con el atributo correcto
    cy.get("a.gh-tags-list-item")
      .first()
      .within(() => {
        // Encuentra el tag por data-test-post-id y guarda su ID
        if (flag === "notClick") {
          cy.get("a")
            .first()
            .then(() => {
              cy.get("a.gh-tag-list-title")
                .first()
                .should("include.text", name);
            });
        } else if (flag === "click") {
          cy.get("a")
            .first()
            .then(() => {
              cy.get("a.gh-tag-list-title").first().click({ force: true });
            });
        }
      });
  }
}
