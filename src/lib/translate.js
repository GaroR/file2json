"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translate(text, dictionary) {
    let objectList = [];
    let lines = text.split("\n");
    lines.forEach((line, index) => {
        if (line.length === dictionary.lineSize) {
            let object = {};
            dictionary.fields.forEach((field) => {
                object[field.name] = line.substr(field.position, field.size);
            });
            objectList.push(object);
        }
        else {
            throw "Error on line " + index + ": \n line size invalid, the line must have " + dictionary.lineSize + " characters";
        }
    });
    return objectList;
}
exports.translate = translate;
