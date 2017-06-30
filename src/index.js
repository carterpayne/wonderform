import { WonderForm } from "./wonderform.js";

module.exports = function (selector) {
    const htmlForms = document.querySelectorAll(selector);
    let wonderforms = [];
    htmlForms.forEach(f => {
        wonderforms.push(new WonderForm(f));
    });
};
