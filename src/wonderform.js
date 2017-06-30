import { Field } from "./field.js";

export class WonderForm {
    constructor(htmlForm) {
        this.htmlForm = htmlForm;
        this.htmlInputs = findChildrenInputs(htmlForm);
        this.fields = {};
        this.htmlInputs.forEach(i => {
            let field = new Field(i);
            this.fields[field.name] = field;
        });
        this.htmlForm.addEventListener("submit", e => {
            this.submit();
            e.preventDefault();
        });
    }

    submit() {
        if (!this.validate()) {
            return;
        }
        let data = this.getData();
        let consoleString = "";
        for(let fieldKey in data) {
            consoleString += "Field: " + fieldKey + ", Value: " + data[fieldKey];
            consoleString += "\n";
        }

        console.log(consoleString);
    }

    validate() {
        var isValid = true;
        for(let field in this.fields) {
            let fieldValue = this.fields[field];
            isValid = fieldValue.validate() && isValid;
        }

        return isValid;
    }

    getData() {
        let data = {};
        for(let fieldKey in this.fields) {
            let field = this.fields[fieldKey];
            data[fieldKey] = field.getValue();
        }
        return data;
    }
}

function findChildrenInputs(node) {
    var inputs = [];
    var nodeChildren = node.children;
    for(var i = 0; i < nodeChildren.length; i++) {
        var child = nodeChildren[i];
        if (child.tagName === "INPUT") {
            inputs.push(child);
        } else {
            inputs = inputs.concat(findChildrenInputs(child));
        }
    }
    return inputs;
}

