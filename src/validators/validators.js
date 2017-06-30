import { NameValidator } from "./name.js";
import { RequiredValidator } from "./required.js";
import { EmailValidator } from "./email.js";
import { DateValidator } from "./date.js";
import { MinLengthValidator } from "./minLength.js";

let registeredValidators = [
    NameValidator,
    RequiredValidator,
    EmailValidator,
    DateValidator,
    MinLengthValidator
];

export function validators(input) {
    var validators = {};
    registeredValidators.forEach(v => {
        if (input.hasAttribute(v.validatorName)) {
            let option = input.getAttribute(v.validatorName);
            validators[v.validatorName] = new v(option);
        }
    });
    return validators;
}

