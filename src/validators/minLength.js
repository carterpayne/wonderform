export class MinLengthValidator {
    static get validatorName() { return "min-length"; }
    constructor(option) {
        this.minLength = parseInt(option);
        this.message = "Field must be at least " + option + " characters.";
    }

    validate(value) {
        if (!value) {
            return true;
        }
        return value.length >= this.minLength;
    }
}
