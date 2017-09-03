export interface IDictionary {
    lineTypes: ILineTypes,
    lineDefinition: ILineDefinition,
    lineIndicator: string,
    type: any
}

interface ILineTypes {
    position: number,
    size: number,
    indicators: Array<IIndicator>,
}

export interface ILineDefinition {
    [name: string]: IDefinitionObject,
}

export interface IDefinitionObject {
    type: any,
    lineSize: number,
    definitions: Array<IDefinition>
}

export interface IDefinition {
    name: string,
    position: number,
    size: number
}

export interface IIndicator {
    type: string,
    value: any
}