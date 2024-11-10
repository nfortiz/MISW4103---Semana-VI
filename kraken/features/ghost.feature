Feature: Ghost

@user4 @web
Scenario: E0004 - Editar el titulo y contenido de un post previamente creado
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  When I enter email "d.andrades@uniandes.edu.co" password "ArpolisVI204*"
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
  And I wait for 1 seconds
  Then Edito el titulo
  Then Clic en Contenido
  Then Edito contenido del post
  And I wait for 1 seconds
  Then Clic en boton de Update
  Then Clic para devolverse a los posts
  Then Valida titulo del Post editado en la lista de posts
  Then Entro al post editado
  Then Clic en Contenido
  Then Valido el contenido del post editado