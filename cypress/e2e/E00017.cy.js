const BASE_URL = "http://localhost:2368/";
import { LogIn } from "../pages/logIn";
import { MembersPage } from "../pages/membersPage";
import { PrincipalPage } from "../pages/principalPage";
import { faker } from "@faker-js/faker";

// Configuración para ignorar una excepción específica que podría interrumpir la prueba
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false; // Ignorar esta excepción específica relacionada con la interrupción de play()
  }
  // Permitir que otras excepciones no controladas se manejen normalmente
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    // Given: Navegar a la página de inicio de sesión del administrador
    cy.visit("http://localhost:2368/ghost/#/signin");

    // When: Iniciar sesión con credenciales válidas
    LogIn.logIn("d.andrades@uniandes.edu.co", "ArpolisVI204*");
    LogIn.logInButton();
  });

  it("E00017 - Invalid Email Validation", function () {
    // When Navegar a la sección de miembros y abrir el formulario para crear un nuevo miembro
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(2000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    // Then Generar un nombre y nota válidos, pero un email inválido
    const memberData = {
      name: faker.name.fullName(),
      email: "invalid-email-format", // Email inválido
      note: faker.lorem.sentence(),
    };

    // Then Llenar el formulario con el email inválido
    MembersPage.fillMemberForm(memberData);

    // Then Hacer clic en el botón para guardar el nuevo miembro
    MembersPage.clickSaveButton();

    // Then Verificar que se muestre el mensaje de error "Invalid Email."
    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
  });
});
