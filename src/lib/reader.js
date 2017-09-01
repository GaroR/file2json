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
