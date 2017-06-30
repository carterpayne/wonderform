export class RequiredValidator {
    static get validatorName() { return "required"; }
    constructor(option) {
        this.message = "Field is required.";
    }
    validate(value) {
        return value !== undefined && value !== null && value.length > 0;
    }
}

