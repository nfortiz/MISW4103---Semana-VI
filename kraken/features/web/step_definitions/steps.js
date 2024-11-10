const { Given, When, Then } = require("@cucumber/cucumber");
const {
  getTitlePostSection,
  clickNewPost,
  writeTitlePost,
  clickContentPost,
  writeContentPost,
  clickNewPostPublishFlow,
  clickNewPostContinue,
  clickNewPostPublish,
  clickNewPostCloseModal,
  lastPostCreated,
  viewContent,
  updatePostButton,
  clickBackToPosts,
  deletePost,
} = require("../pages/post");

const {
  clickNewMember,
  writeFormMember,
  clickSaveMember,
  goToListMembers,
  validateMemberInList,
  writeInvalidFormMember,
  checkInvalidEmailError,
  checkLongNoteCharacterCount,
  clickMemberByEmail,
  updateMemberName,
  validateUpdatedMemberName,
  openMemberActions,
  clickDeleteMember,
  confirmDeleteMember,
  verifyMemberDeleted
} = require("../pages/member");
const { logIn, logInButton } = require("../pages/login");
const {
  getTitleAdmin,
  clickPosts,
  clickMembers,
} = require("../pages/principal");

//Seccion login
When(
  "I enter email {string} password {string}",
  async function (email, password) {
    await logIn(this.driver, email, password);
  }
);

Then("I clic to Sign in", async function () {
  await logInButton(this.driver);
});

//Principal
Then("Página principal del administrador", async function () {
  await getTitleAdmin(this.driver);
});

Then("Clic en la sección de Posts", async function () {
  await clickPosts(this.driver);
});

//Posts
Then("Página de listado de posts", async function () {
  await getTitlePostSection(this.driver);
});

Then("Clic en el boton New Post", async function () {
  await clickNewPost(this.driver);
});

Then("Titulo del post", async function () {
  let titulo = "Titulo de prueba";
  await writeTitlePost(this.driver, titulo);
});

Then("Clic en Contenido", async function () {
  await clickContentPost(this.driver);
});

Then("Contenido del post", async function () {
  let contenido = "Contenido de prueba";
  await writeContentPost(this.driver, contenido);
});

Then("Clic en el boton publish-flow", async function () {
  await clickNewPostPublishFlow(this.driver);
});

Then("Clic en el boton Continue", async function () {
  await clickNewPostContinue(this.driver);
});

Then("Clic en el boton Publish Post", async function () {
  await clickNewPostPublish(this.driver);
});

Then("Cierre el modal de confirmación", async function () {
  await clickNewPostCloseModal(this.driver);
});

Then("Valida Post publicado en la lista de posts", async function () {
  let titulo = "Titulo de prueba";
  await lastPostCreated(this.driver, titulo, "notClick");
});

Then("Entro al post creado", async function () {
  let titulo = "Titulo de prueba";
  await lastPostCreated(this.driver, titulo, "click");
});

Then("Valido el contenido del post", async function () {
  let contenido = "Contenido de prueba";
  await viewContent(this.driver, contenido);
});

Then("Edito el titulo", async function () {
  let tituloEditado = "Titulo de prueba editado";
  await writeTitlePost(this.driver, tituloEditado);
});

Then("Edito contenido del post", async function () {
  let contenidoEditado = "Contenido de prueba editado";
  await writeContentPost(this.driver, contenidoEditado);
});

Then("Clic en boton de Update", async function () {
  await updatePostButton(this.driver);
});

Then("Clic para devolverse a los posts", async function () {
  await clickBackToPosts(this.driver);
});

Then("Valida titulo del Post editado en la lista de posts", async function () {
  let tituloEditado = "Titulo de prueba editado";
  await lastPostCreated(this.driver, tituloEditado, "notClick");
});

Then("Entro al post editado", async function () {
  let tituloEditado = "Titulo de prueba editado";
  await lastPostCreated(this.driver, tituloEditado, "click");
});

Then("Valido el contenido del post editado", async function () {
  let contenidoEditado = "Contenido de prueba editado";
  await viewContent(this.driver, contenidoEditado);
});

Then("Clic derecho en el post creado", async function () {
  let titulo = "Titulo de prueba";
  await lastPostCreated(this.driver, titulo, "rightClick");
});

Then("Elimino el post", async function () {
  await deletePost(this.driver);
});

Then("Clic en la sección de Members", async function () {
  await clickMembers(this.driver);
});

Then("Clic en el botón de New Member", async function () {
  await clickNewMember(this.driver);
});

Then("Contenido del member", async function () {
  let name = "Nombre";
  let email = "dasda1312@gmail121.com";
  let note = "Nota de prueba";
  await writeFormMember(this.driver, name, email, note);
});

Then("Clic en Save Member", async function () {
  await clickSaveMember(this.driver);
});

Then("clic en List Members", async function () {
  await goToListMembers(this.driver);
});

Then("Valida Member en lista", async function () {
  let email = "dasda1312@gmail121.com";
  await validateMemberInList(this.driver, email);
});

Then("Contenido de member con email inválido", async function () {
  const name = "Nombre";
  const email = "invalid-email-format";
  const note = "Nota de prueba";
  await writeInvalidFormMember(this.driver, name, email, note);
});

Then("Verifica mensaje de error de email inválido", async function () {
  await checkInvalidEmailError(this.driver);
});


Then("Contenido de member con email inválido y nota larga", async function () {
  const name = "Nombre Inválido";
  const email = "invalid-email-format"; // Email inválido
  const longNote = "a".repeat(501); // Genera una nota de más de 500 caracteres
  await writeFormMember(this.driver, name, email, longNote);
});


Then("Verifica contador de caracteres de nota", async function () {
  await checkLongNoteCharacterCount(this.driver);
});

Then("Selecciona miembro por email", async function () {
  await clickMemberByEmail(this.driver, this.initialMemberData.email);
});

Then("Editar nombre del miembro", async function () {
  const updatedName = "New Name";
  this.updatedName = updatedName;
  await updateMemberName(this.driver, updatedName);
});

Then("Valida nombre del miembro actualizado", async function () {
  await validateUpdatedMemberName(this.driver, this.initialMemberData.email, this.updatedName);
});

Then("Contenido de member inicial", async function () {
  const initialMemberData = {
    name: "Test Edit Name",
    email: "dasda1312@gmail1212.com",
    note: "note",
  };
  this.initialMemberData = initialMemberData;
  await writeFormMember(this.driver, initialMemberData.name, initialMemberData.email, initialMemberData.note);
});


Then("Contenido de member para eliminar", async function () {
  const memberData = {
    name: "Nombre de Ejemplo",
    email: "dasda1313@correo.com",
    note: "Nota de ejemplo",
  };
  await writeFormMember(this.driver, memberData.name, memberData.email, memberData.note);
});

Then("Selecciona Member para editar", async function () {
  await clickMemberByEmail(this.driver, "dasda1313@correo.com");
});

Then("Abre menú de acciones del miembro", async function () {
  await openMemberActions(this.driver);
});

Then("Clic en Eliminar Miembro", async function () {
  await clickDeleteMember(this.driver);
});

Then("Confirma eliminación de Miembro", async function () {
  await confirmDeleteMember(this.driver);
});

Then("Verifica Miembro eliminado en la lista", async function () {
  await verifyMemberDeleted(this.driver, "dasda1313@correo.com");
});
