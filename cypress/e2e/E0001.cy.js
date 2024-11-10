import { LogIn } from "../pages/logIn";
import { PostPage } from "../pages/postPage";
import { PrincipalPage } from "../pages/principalPage";
import { faker } from '@faker-js/faker';

describe('Escenarios E2E para Ghost', function () {

    beforeEach(() => {
        //Given que estoy en la pagina del login del Admin
        cy.visit('http://localhost:2368/ghost/#/signin');

        //When inicio sesión con mis credenciales
        LogIn.logIn('d.andrades@uniandes.edu.co', 'ArpolisVI204*');
        LogIn.logInButton();

        //Then debería estar en el sitio principal
        PrincipalPage.getTitle().should('have.text', 'MISW4103');
    });

    it('E0001 - Crear un post con titulo', function () {
        //When le de click en la sección de Posts
        PrincipalPage.clickPosts();

        //Then el administrador debería ver la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //When le de click en el boton New Post
        PostPage.clickNewPost();

        //Then el administrador debería ver la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //Then escriba el titulo del post
        let titulo = faker.lorem.word();
        PostPage.writeTitle(titulo);

        //Then escribimos contenido y borramos para activar boton de publicar
        let contenido = faker.lorem.words();
        PostPage.writeContent(contenido);
        PostPage.clearContent();

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
    });
});