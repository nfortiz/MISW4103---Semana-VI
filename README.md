# MISW4103---Semana-V
- Daniel Andrade Suárez - d.andrades@uniandes.edu.co
- Daniel Oicatá Hernández - d.oicata@uniandes.edu.co
- Felix Orduz - f.orduz@uniandes.edu.co
- Nixon Ortiz - nf.ortiz@uniandes.edu.co

## Ejecutar las pruebas

### Prerequisitios
- Node JS (versión superior a la 15.0)
- Ghost ejecutandose (versión 5.96.0)
- Git (versión 2.46.0)

### Clone del repositorio
A través del comando git clone, se debe clonar el repositorio a un directorio local. 

### Recomendaciones para la ejecución de las pruebas:**
- **Condiciones iniciales para ejecutar pruebas en Ghost:** Las pruebas deben ejecutarse en la versión de Ghost especificada y se enfocan en las funcionalidades principales de la ABP (Posts, Pages, Tags, Members). Para evitar interferencias en los resultados, se recomienda que estas secciones estén vacías y sin contenido en drafts, ya que elementos existentes pueden afectar la ejecución correcta de las pruebas. Aplica para Cypress como a Kraken.

- **Manejo de errores iniciales en Cypress y Kraken:** Al ejecutar las pruebas por primera vez, Cypress y Kraken pueden presentar errores inesperados, como problemas para cargar Ghost a tiempo. Si las dos primeras ejecuciones fallan, se recomienda reintentarlas, ya que en la mayoría de los casos, las pruebas logran completarse exitosamente después de estos dos intentos.

### Instalación de dependencias:
- Las dependencias del proyecto están definidas en los archivos package.json y package-lock.json. Para instalarlas, primero se debe inicializar el proyecto ejecutando el comando `npm init -y`, y luego usar `npm install` para descargar e instalar todas las dependencias especificadas.

### Ejecución en Cypress
- **Instalación de Cypress:** Cypress se instala con el comando `npm install cypress --save-dev`. Una vez instalado, puedes verificar la versión con `cypress --version`, la cual debe ser `13.5.2` para asegurar la compatibilidad con este repositorio.
  
- **Configuración de credenciales:** En la ruta `cypress/fixtures/`, se encuentra el archivo `properties.json`, donde es necesario reemplazar los valores de `email` y `password` con tus credenciales para ejecutar las pruebas correctamente.
  
- **Ejecución de pruebas:** Para iniciar las pruebas, primero abre una terminal y ejecuta `npx cypress open`, lo que lanzará la interfaz de Cypress. Crea un nuevo proyecto apuntando al directorio donde clonaste el repositorio. Dentro de la carpeta e2e encontrarás 20 archivos, cada uno identificado con el código `E000XXX`, que representa un escenario específico de prueba. Para ejecutar las pruebas, haz clic en cada archivo `E000XXX.cy.js`. Se recomienda ejecutarlos uno por uno para un mejor control de los resultados.

### Ejecución Kraken
- **Instalación de Kraken:** Para instalar Kraken, utiliza el comando `npm install kraken-node`. Después de la instalación, es importante verificar que todos los prerequisitos necesarios estén cumplidos. Ejecuta el comando `npx kraken-node doctor` para confirmar que todos los componentes requeridos están instalados. Si algún prerequisito falta, se debe instalar antes de ejecutar las pruebas.

- **Ejecución Kraken:** En primera instancia, se debe ingresar a la carpeta de Kraken. Para ello, desde la terminal se debe correr el comando `cd kraken`. Luego, en la ruta `kraken\features\features`
