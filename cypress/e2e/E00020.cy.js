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
  });

  it("E0020 - Delete Member", function () {
    // Crear un nuevo miembro
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(2000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    const memberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    MembersPage.fillMemberForm(memberData);
    MembersPage.clickSaveButton();

    // Volver a la lista de miembros y buscar el miembro creado
    MembersPage.goToMembersList();
    cy.wait(2000);

    // Seleccionar el miembro en la lista para editarlo
    MembersPage.clickMemberByEmail(memberData.email);

    // Abrir el menú de acciones y confirmar eliminación
    MembersPage.openMemberActions();
    MembersPage.clickDeleteMember();
    MembersPage.confirmDeleteMember();

    // Verificar que el miembro ya no está en la lista
    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
  });

});
