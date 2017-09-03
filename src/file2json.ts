import Reader from "./lib/reader";
import { translator } from "./lib/translate";
import { IDictionary } from "./lib/types";

class File2json {
    private callback: Function;
    constructor() {
    }

    public convert(files: Array<File>, dictionary: IDictionary) {
        let reader = new Reader();
        return new Promise((resolve, reject) => {
            try {
                if (files && files.length === 1) {
                    reader.readFile(files[0])
                        .then((retorno: string) => {
                            if (dictionary.lineTypes) {
                                resolve(translator.translate(retorno, dictionary));
                            } else {
                                resolve(translator.simpleTranslate(retorno, dictionary))
                            }
                        });
                } else {
                    throw "The File list must contain only one file";
                }
            } catch (error) {
                reject(error)
            }
        });
    }
}

export = new File2json();