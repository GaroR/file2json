import Reader from "./lib/reader";
import { translate } from "./lib/translate";
import { promise } from "./objects/promise";

class File2json {
    private callback: Function;
    constructor() {
    }

    public convert(files: Array<File>, dictionary: any) {
        let reader = new Reader();
        if (files && files.length === 1) {
            reader.readFile(files[0])
                .then((retorno: string) => {
                    var returnObject = promise;
                    returnObject.registerListener(this.callback);
                    returnObject.value = translate(retorno, dictionary);
                });
        } else {
            throw "The File list must contain only one file";
        }
        return this;
    }

    public then(callback: Function) {
        this.callback = callback;
        return this;
    }
}

export = new File2json();