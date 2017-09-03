import { IDictionary, IIndicator, IDefinitionObject, IDefinition, ILineTypes } from "./types";
export class translator {
    public static translate(text: string, dictionary: IDictionary): any {
        let processedFile: any = (dictionary.type === Object || dictionary.type === undefined) ? {} : [];
        let lines = text.split(dictionary.lineIndicator);

        let tempLines: Array<string> = [];
        let tempLineDefinition: IDefinitionObject;
        let tempLineType: IIndicator;
        lines.forEach((line, index) => {
            try {
                // get the type of current line
                let lineTypeCode = line.substr(dictionary.lineTypes.position, dictionary.lineTypes.size);
                // get the type definition from dictionary
                let lineTypeDefinition = dictionary.lineTypes.indicators
                    .find((indicator: IIndicator): boolean => {
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
            } catch (error) {
                throw error;
            }
        });

        return processedFile;
    }

    public static simpleTranslate(text: string, dictionary: any): Array<any> {
        let objectList: Array<any> = [];

        let lines = text.split("\n");
        lines.forEach((line, index) => {
            if (line.length === dictionary.lineSize) {
                let object: any = {};
                dictionary.lineDefinition.forEach((field: any) => {
                    object[field.name] = line.substr(field.position, field.size);
                });
                objectList.push(object);
            } else {
                throw "Error on line " + index + ": \n line size invalid, the line must have " + dictionary.lineSize + " characters";
            }
        });
        return objectList;
    }

    static transformLineToObject(line: string, definitions: Array<IDefinition>): Object {
        let returnObject: any = {};
        definitions.forEach((definition: IDefinition) => {
            returnObject[definition.name] = line.substr(definition.position, definition.size);
        });
        return returnObject
    }

    static transformLinesToArray(lines: Array<string>, definitions: Array<IDefinition>): Array<any> {
        let returnArray: Array<any> = [];
        lines.forEach((line: string) => {
            returnArray.push(this.transformLineToObject(line, definitions));
        });
        return returnArray;
    }

}