import { validators } from "./validators/validators.js";

export class Field {
    constructor(htmlInput) {
        this.htmlInput = htmlInput;
        this.name = this.htmlInput.getAttribute("name");
        this.validators = validators(this.htmlInput);
        this.errors = null;
        this.formGroup = this.htmlInput.parentElement;
    }

    validate() {
        this.errors = null;
        let value = this.htmlInput.value;
        let errorMessageArr = [];
        for(let validatorName in this.validators) {
            let validator = this.validators[validatorName];
            if (!validator.validate(value)) {
                this.errors = this.errors || {};
                this.errors[validatorName] = validator.message;
                errorMessageArr.push(validator.message);
            }
        }
        var isValid = this.errors === null;
        if (!isValid) {
            addClass(this.formGroup, "has-error");
            this.addError(errorMessageArr.join("\n"));
        } else {
            removeClass(this.formGroup, "has-error");
            this.removeError();
        }
        return isValid;
    }

    getValue() {
        return this.htmlInput.value;
    }

    addError(message) {
        if (!this.errorElem) {
            let p = document.createElement("p");
            p.className = "bg-danger";
            this.errorElem = p;
        }
        this.errorElem.textContent = message;
        this.formGroup.appendChild(this.errorElem);
    }

    removeError() {
        if (!this.errorElem) {
            return;
        }
        this.formGroup.removeChild(this.errorElem);
        this.errorElem = null;
    }
}

function addClass(elm, className) {
    if (!elm.className.includes(className)) {
        elm.className += " " + className;
    }
}

function removeClass(elm, className) {
    elm.className = elm.className.replace(className, "");
}
