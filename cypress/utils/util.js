import { LogIn } from "../pages/logIn";
const BASE_URL = "http://localhost:2368";

export function doLogIn() {
    cy.visit(BASE_URL + '/ghost/#/signin');
    LogIn.logIn('d.andrades@uniandes.edu.co', 'ArpolisVI204*');
    LogIn.logInButton();
    cy.get('a[title="Dashboard"]').should('be.visible');
}
