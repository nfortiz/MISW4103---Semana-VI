import { LogIn } from "../pages/logIn";
import { PostPage } from "../pages/postPage";
import { PrincipalPage } from "../pages/principalPage";
import { faker } from '@faker-js/faker';
const data = require('../fixtures/properties.json');

Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("The play() request was interrupted")) {
      return false;
    }
  });

describe('Escenarios E2E para Ghost', function () {

  beforeEach(() => {
    cy.fixture('properties.json').then((data) => {
        //Given que estoy en la pagina del login del Admin
        cy.visit('http://localhost:2368/ghost/#/signin');

        //When inicio sesión con mis credenciales
        LogIn.logIn(data.email, data.password);
        LogIn.logInButton();
    });
  });

    it('E0003 - Editar el titulo de un post previamente creado', function () {
        //When le de click en la sección de Posts
        PrincipalPage.clickPosts();

        //Then el administrador debería ver la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //When le de click en el boton New Post
        PostPage.clickNewPost();

        //Then el administrador debería ver la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //When escriba el titulo del post
        let titulo = faker.lorem.word();
        PostPage.writeTitle(titulo);

        //And el contenido del post
        let contenido = faker.lorem.words();
        PostPage.writeContent(contenido);

        //And le de click en el boton de Publish
        PostPage.publishPostButton();
        cy.wait(1000);

        //And le de click en el boton Continue, final review
        PostPage.continueButton();
       
        //And le de click en el boton Publish post, right now
        PostPage.publishPostButtonFinal();

        //And cierre el modal de confirmación de publicación
        PostPage.closePublishModal();

        //Then debería ver el post publicado en la lista de posts
        PostPage.lastPostCreated(titulo, 'notClick');

        //When le de click en el post creado
        PostPage.lastPostCreated(titulo, 'click');
        
        //Then edito el titulo del post
        let tituloEditado = faker.lorem.word();
        PostPage.writeTitle(tituloEditado);

        //And le de click en el boton de update
        PostPage.updatePostButton();

        //And le de click en el boton de devolverme a la lista de posts
        PostPage.clickBackToPosts();

        //Then debería ver el post publicado en la lista de posts
        PostPage.lastPostCreated(tituloEditado, 'notClick');
    });
});