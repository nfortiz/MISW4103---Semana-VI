module.exports = {
    clickNewMember: async function (driver) {
        let clicButton = await driver.$('[data-test-new-member-button="true"]');
        return clicButton.click({ force: true });
    },

    writeFormMember: async function (driver, name, email, note) {

        let textNameField = await driver.$('[data-test-input="member-name"]');
        let textEmailField = await driver.$('[data-test-input="member-email"]');
        let textNoteField = await driver.$('[data-test-input="member-note"]');


        await textNameField.setValue(name);
        await textEmailField.setValue(email);
        await textNoteField.setValue(note);
    },

    clickSaveMember: async function (driver) {
        let saveButton = await driver.$('button[data-test-button="save"]');
        return saveButton.click();
    },

    goToListMembers: async function (driver) {
        let backToListButton = await driver.$('[data-test-link="members-back"]');
        return backToListButton.click();
    },

    validateMemberInList: async function (driver, email) {

        let memberEmails = await driver.$$(`p.gh-members-list-email`);


        for (const element of memberEmails) {
            let text = await element.getText();
            if (text.trim() === email) {
                return true;
            }
        }
        return false;
    },

    validateMemberInList: async function(driver, email) {
        const { expect } = await import('chai'); // Importa expect de chai dentro de la función
        let memberEmails = await driver.$$(`p.gh-members-list-email`);

        let emailFound = false;
        for (const element of memberEmails) {
          let text = await element.getText();
          if (text.trim() === email) {
            emailFound = true;
            break;
          }
        }

        // Valida que el email se haya encontrado en la lista de miembros
        expect(emailFound).to.be.true;
      },

}
