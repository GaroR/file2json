(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.file2json = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
const reader_1 = require("./lib/reader");
const translate_1 = require("./lib/translate");
class File2json {
    constructor() {
    }
    convert(files, dictionary) {
        let reader = new reader_1.default();
        return new Promise((resolve, reject) => {
            try {
                if (files && files.length === 1) {
                    reader.readFile(files[0])
                        .then((retorno) => {
                        if (dictionary.lineTypes) {
                            resolve(translate_1.translator.translate(retorno, dictionary));
                        }
                        else {
                            resolve(translate_1.translator.simpleTranslate(retorno, dictionary));
                        }
                    });
                }
                else {
                    throw "The File list must contain only one file";
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
module.exports = new File2json();

},{"./lib/reader":2,"./lib/translate":3}],2:[function(require,module,exports){
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
class translator {
    static translate(text, dictionary) {
        let processedFile = (dictionary.type === Object || dictionary.type === undefined) ? {} : [];
        let lines = text.split(dictionary.lineIndicator);
        let tempLines = [];
        let tempLineDefinition;
        let tempLineType;
        lines.forEach((line, index) => {
            try {
                // get the type of current line
                let lineTypeCode = line.substr(dictionary.lineTypes.position, dictionary.lineTypes.size);
                // get the type definition from dictionary
                let lineTypeDefinition = dictionary.lineTypes.indicators
                    .find((indicator) => {
                    return lineTypeCode == indicator.value;
                });
                // case the line definition is not on dictionary throw error
                if (lineTypeDefinition === undefined) {
                    throw `Cannot find definition of line ${index + 1}, type returned ${lineTypeCode}`;
                }
                //start the line read
                let lineDefinition = dictionary.lineDefinition[lineTypeDefinition.type];
                // the line size must match with the line size definition from dictionary
                if (lineDefinition.lineSize !== line.length) {
                    throw `Error on line ${index + 1}: \nline size invalid, the line must have ${lineDefinition.lineSize} characters`;
                }
                if (tempLines.length > 0 && lineDefinition.type !== Array) {
                    if (dictionary.type === Object || dictionary.type === undefined) {
                        processedFile[tempLineType.type] = this.transformLinesToArray(tempLines, tempLineDefinition.definitions);
                    }
                    tempLines = [];
                }
                switch (lineDefinition.type) {
                    case Object:
                        if (dictionary.type === Object || dictionary.type === undefined) {
                            processedFile = Object.assign(processedFile, this.transformLineToObject(line, lineDefinition.definitions));
                        }
                        break;
                    case Array:
                        tempLines.push(line);
                        tempLineType = lineTypeDefinition;
                        tempLineDefinition = lineDefinition;
                        break;
                    default:
                        break;
                }
            }
            catch (error) {
                throw error;
            }
        });
        return processedFile;
    }
    static simpleTranslate(text, dictionary) {
        let objectList = [];
        let lines = text.split("\n");
        lines.forEach((line, index) => {
            if (line.length === dictionary.lineSize) {
                let object = {};
                dictionary.lineDefinition.forEach((field) => {
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
    static transformLineToObject(line, definitions) {
        let returnObject = {};
        definitions.forEach((definition) => {
            returnObject[definition.name] = line.substr(definition.position, definition.size);
        });
        return returnObject;
    }
    static transformLinesToArray(lines, definitions) {
        let returnArray = [];
        lines.forEach((line) => {
            returnArray.push(this.transformLineToObject(line, definitions));
        });
        return returnArray;
    }
}
exports.translator = translator;

},{}]},{},[1])(1)
});