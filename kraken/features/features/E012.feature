Feature: Ghost

@user2 @web
Scenario: E012 - Crear un Page vacio
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  When I enter email "d.andrades@uniandes.edu.co" password "ArpolisVI204*"
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Click en la sección de Pages
  Then Página de listado de Pages
  When Clic en el boton New Page
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