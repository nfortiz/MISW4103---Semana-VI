import { LogIn } from "../pages/logIn";
const BASE_URL = "http://localhost:2368";

export const data = {
    "email": "d.andrades@uniandes.edu.co",
    "password": "ArpolisVI204*"
};

export function doLogIn() {
    cy.visit(BASE_URL + '/ghost/#/signin');
    LogIn.logIn(data.password, data.password);
    LogIn.logInButton();
    cy.get('a[title="Dashboard"]').should('be.visible');
}

