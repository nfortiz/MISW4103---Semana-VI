Feature: Ghost

@user10 @web
Scenario: E00010 - Crear tac con caracteres especiales.
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  When I enter email "d.oicata@uniandes.edu.co" password "1090Oicata@"
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Tags
  Then Página de listado de tags
  Then Clic en el boton New tag
  When Nombre del tag con caracteres especiales "$%&$%&$%"
  Then Clic en Descripción del tag
  When Descripción del tag "dsfghjklhjfgchgjkjlñl34567890345678"
  Then Clic en el boton guardar
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "$%&$%&$%"