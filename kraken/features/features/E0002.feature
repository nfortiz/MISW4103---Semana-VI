Feature: Ghost

@user2 @web
Scenario: E0002 - Crear un post con titulo y contenido
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
  And I wait for 1 seconds
  Then Valida Post publicado en la lista de posts
  Then Entro al post creado
  And I wait for 1 seconds
  Then Clic en Contenido
  Then Valido el contenido del post