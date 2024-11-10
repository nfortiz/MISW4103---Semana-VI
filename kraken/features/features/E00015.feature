Feature: Ghost

@user5 @web
Scenario: E015 - Eliminamos una Page previamente creada
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  When I enter email "d.andrades@uniandes.edu.co" password "ArpolisVI204*"
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Click en la sección de Pages
  Then Página de listado de Pages
  When Click en el boton New Page
  Then Titulo del page
  Then Clic en Contenido page
  Then Contenido del Page
  And I wait for 1 seconds
  Then Clic en el boton publish-flow page
  Then Clic en el boton Continue page
  Then Clic en el boton Publish Page
  Then Cierre el modal de confirmación page
  Then Valida Page publicado en la lista de Pages
  Then Clic derecho en la Page creada
  Then Elimino la Page