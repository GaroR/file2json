(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.file2json = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./lib/reader":2,"./lib/translate":3,"./objects/promise":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reader {
    constructor() {
        this.fileReader = new FileReader();
    }
    /**
     * readFile
     */
    readFile(file) {
        var txtFile = this.fileReader.readAsText(file);
        return this;
    }
    then(callback) {
        this.fileReader.onload = (file) => {
            callback(file.target.result);
        };
        return (this);
    }
    catch(callback) {
        this.fileReader.onerror = (error) => {
            callback(error);
        };
        return this;
    }
}
exports.default = Reader;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = {
    internalValue: {},
    valueListener: function (value) { },
    set value(newValue) {
        this.internalValue = newValue;
        this.valueListener(this.internalValue);
    },
    get value() {
        return this.internalValue;
    },
    registerListener: function (newListener) {
        this.valueListener = newListener;
    }
};

},{}]},{},[1])(1)
});