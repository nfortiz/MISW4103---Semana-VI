Feature: Ghost

@user3 @web
Scenario: E0003 - Editar el titulo de un post previamente creado
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
  Then Entro al post creado
  Then Edito el titulo
  Then Clic en Contenido
  Then Clic en boton de Update
  Then Clic para devolverse a los posts
  Then Valida titulo del Post editado en la lista de posts