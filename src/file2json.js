"use strict";
const reader_1 = require("./lib/reader");
const translate_1 = require("./lib/translate");
const promise_1 = require("./objects/promise");
class File2json {
    constructor() {
    }
    convert(files, dictionary) {
        let reader = new reader_1.default();
        if (files && files.length === 1) {
            reader.readFile(files[0])
                .then((retorno) => {
                var returnObject = promise_1.promise;
                returnObject.registerListener(this.callback);
                returnObject.value = translate_1.translate(retorno, dictionary);
            });
        }
        else {
            throw "The File list must contain only one file";
        }
        return this;
    }
    then(callback) {
        this.callback = callback;
        return this;
    }
}
module.exports = new File2json();
