const BASE_URL = "http://localhost:2368/";
import { LogIn } from "../pages/logIn";
import { MembersPage } from "../pages/membersPage";
import { PrincipalPage } from "../pages/principalPage";
import { faker } from "@faker-js/faker";

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    cy.visit("http://localhost:2368/ghost/#/signin");
    LogIn.logIn("d.andrades@uniandes.edu.co", "ArpolisVI204*");
    LogIn.logInButton();
    PrincipalPage.getTitle().should("have.text", "MISW4103");
  });

  it("E0019 - Edit Member", function () {
    // Crear un nuevo miembro
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(2000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    const initialMemberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    MembersPage.fillMemberForm(initialMemberData);
    MembersPage.clickSaveButton();

    // Volver a la lista de miembros y buscar el miembro creado
    MembersPage.goToMembersList();
    cy.wait(2000);

    MembersPage.clickMemberByEmail(initialMemberData.email);

    // Editar el nombre del miembro
    const updatedName = faker.name.fullName();
    cy.get('input[data-test-input="member-name"]').clear().type(updatedName);

    // Guardar los cambios
    MembersPage.clickSaveButton();
    MembersPage.goToMembersList();

    // Confirmar que el nombre ha cambiado en la lista
    cy.contains("p.gh-members-list-email", initialMemberData.email)
      .parent()
      .within(() => {
        cy.get("h3.gh-members-list-name").should("have.text", updatedName);
      });
  });
});
