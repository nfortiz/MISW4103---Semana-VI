Feature: Ghost

@user5 @web
Scenario: E0005 - Eliminamos un post previamente creado
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Posts
  Then Página de listado de posts
  When Clic en el boton New Post
  Then Titulo del post
  Then Clic en Contenido
  Then Contenido del post
  And I wait for 1 seconds
  Then Clic en el boton publish-flow
  Then Clic en el boton Continue
  Then Clic en el boton Publish Post
  Then Cierre el modal de confirmación
  Then Valida Post publicado en la lista de posts
  Then Clic derecho en el post creado
  Then Elimino el post