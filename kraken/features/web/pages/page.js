module.exports = {
    getTitlePageSection: async function (driver) {
        let titleField = await driver.$("h2.gh-canvas-title");
        let text = await titleField.getText();
        return titleField.getText();
    },
    clickNewPage: async function (driver) {
        let clickButton = await driver.$('[data-test-new-page-button=""]');
        return clickButton.click({ force: true });
    },
    writeTitlePage: async function (driver, title) {
        let textField = await driver.$('[data-test-editor-title-input=""]');
        await textField.setValue(title);  
    },
    clickContentPage: async function (driver) {
        let contentField = await driver.$('[data-kg="editor"]');
        return contentField.click({ force: true });
    },
    writeContentPage: async function (driver, contenido) {
        let textField = await driver.$('[data-kg="editor"]');
        await textField.setValue(contenido);
    },
    clickNewPagePublishFlow: async function (driver) {
        let clickButton = await driver.$('[data-test-button="publish-flow"]');
        return clickButton.click({ force: true });
    },
    clickNewPageContinue: async function (driver) {
        let clickButton = await driver.$('[data-test-button="continue"]');
        return clickButton.click({ force: true });
    },
    clickNewPagePublish: async function (driver) {
        let clickButton = await driver.$('[data-test-button="confirm-publish"]');
        return clickButton.click({ force: true });
    },
    clickNewPageCloseModal: async function (driver) {
        let clickButton = await driver.$('[data-test-button="close-publish-flow"]');
        return clickButton.click({ force: true });
    },
};