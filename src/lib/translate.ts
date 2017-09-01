export function translate(text: string, dictionary: any): Array<any> {
    let objectList: Array<any> = [];

    let lines = text.split("\n");
    lines.forEach((line, index) => {
        if (line.length === dictionary.lineSize) {
            let object: any = {};
            dictionary.fields.forEach((field: any) => {
                object[field.name] = line.substr(field.position, field.size);
            });
            objectList.push(object);
        } else {
            throw "Error on line " + index + ": \n line size invalid, the line must have " + dictionary.lineSize + " characters";
        }
    });
    return objectList;
}