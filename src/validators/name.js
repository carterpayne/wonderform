export class NameValidator {
    static get validatorName() { return "user-name"; }
    constructor(option) {
        this.message = "Field must have first and last name.";
    }
    validate(value) {
        if (!value) {
            return true;
        }
        return /^\w+\s+\w+/.test(value);
    }
}

