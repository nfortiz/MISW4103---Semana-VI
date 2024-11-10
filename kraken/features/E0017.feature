Feature: Ghost - Validación de Email Inválido

@user1 @web
Scenario: E0017 - Invalid Email Validation
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  When I enter email "d.andrades@uniandes.edu.co" password "ArpolisVI204*"
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Members
  Then Clic en el botón de New Member
  Then Contenido de member con email inválido
  Then Clic en Save Member
  And I wait for 2 seconds
  Then Verifica mensaje de error de email inválido
