let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class EmailValidator {
    static get validatorName() { return "email"; }
    constructor(option) {
        this.message = "Must be a valid email.";
    }

    validate(value) {
        if (!value) {
            return true;
        }
        return emailRegEx.test(value);
    }
}

