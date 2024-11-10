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
    let link = null;
    cy.get("ol.tags-list.gh-list").then(($ols) => {
      cy.get("li").then(($lis) => {
        for (let i = 0; i < $lis.length; i++) {
          cy.get("li")
            .eq(i)
            .then(($li) => {
              cy.get("a")
                .eq(i)
                .then(($a) => {
                  if ($a.text().includes(name)) {
                    cy.get("a").eq(i).first().should("include.text", name);
                    link = $a;
                  }
                });
            });
        }
      });
    });
    if (flag === "click") {
      if (link !== null) link.click({ force: true });
    }
  }

  static busqueda(name, flag) {
    if(flag === "notClick"){
      cy.get('ol.tags-list.gh-list').then(($ols) => {
        cy.get('li').then(($lis) => {
          for (let i = 0; i < $lis.length; i++) {
            cy.get('li').eq(i).then(($li) => {
              cy.get('a').eq(i).then(($a) => {
                if ($a.text().includes(name)) {
                  cy.get('a').eq(i).first()
                  .should("include.text", name);
                }
              })
            })
          }
        })
      })
    }
    else if (flag === "click") {
      cy.get('ol.tags-list.gh-list').then(($ols) => {
        cy.get('li').then(($lis) => {
          let found = false;
          for (let i = 0; i < $lis.length && !found; i++) {
            cy.get('li').eq(i).then(($li) => {
              cy.get('a').eq(i).then(($a) => {
                if ($a.text().includes(name)) {
                  cy.get('a').eq(i).first().click({ force: true });
                  found = true;
                }
              })
            })
          }
        })
      })
    }
  }

  static busqueda_II(name, flag) {
    cy.get('li.gh-list-row.gh-tags-list-item').each(($li) => {
      cy.wrap($li).find('h3').then(($h3) => {
        if ($h3.text().includes(name)) {
          if (flag === "click") {
            cy.wrap($li).click({ force: true });
          } else if (flag === 'notClick') {
            cy.wrap($li).should("include.text", name);
          }
          return false;
        }
      });
    });
  }  
}
