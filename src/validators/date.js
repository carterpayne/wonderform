let datePreRegEx = /^(0[1-9]|1[0-2])\/[0-9]{2}\/[0-9]{4}$/;
export class DateValidator {
    static get validatorName() { return "date"; }
    constructor(option) {
        this.message = "Not a valid date. MM/DD/YYYY";
    }

    validate(value) {
        if (!value) {
            return true;
        }

        if (!datePreRegEx.test(value)) {
            return false;
        }

        let components = value.split("/");
        let month = parseInt(components[0]);
        let day = parseInt(components[1]);
        let year = parseInt(components[2]);
        return validDayOfYear(month, day, year);
    }
}

function validDayOfYear(month, day, year) {
    let maxDay = 31;
    if (month === 2) {
        if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
            maxDay = 29;
        } else {
            maxDay = 28;
        }
    } else if ((month % 2 !== 0 && month < 8) || (month % 2 === 0 && month > 7)) {
        maxDay = 30;
    }
    return day <= maxDay;
}
