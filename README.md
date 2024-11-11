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

### Instalación de dependencias
- Las dependencias del proyectos se encuentran en el archivo package-lock.json y package.json, para poder instalarlas se debe correr el comando `npm init -y` para incializar un proyecto y luego el comando `npm install` para instalar las dependencias.

### Ejecucion de Karaken
- Entrar a la carpeta Kraken
- Ejecutar el comando `npm run k:run`
