Feature: Ghost

@user1 @web
Scenario: E00016 - Crear Member
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  When I enter email "d.andrades@uniandes.edu.co" password "ArpolisVI204*"
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Members
  Then Clic en el botón de New Member
  Then Contenido del member
  Then Clic en Save Member
  Then clic en List Members
  And I wait for 1 seconds
  Then Valida Member en lista

