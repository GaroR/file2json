export default class Reader {
    private fileReader: FileReader;
    constructor() {
        this.fileReader = new FileReader();
    }

    /**
     * readFile
     */
    public readFile(file: File) {
        var txtFile = this.fileReader.readAsText(file);
        return this;
    }

    public then(callback: Function) {
        this.fileReader.onload = (file: any) => {
            callback(file.target.result);
        };
        return (this);
    }

    public catch(callback: Function) {
        this.fileReader.onerror = (error) => {
            callback(error);
        }
        return this;
    }
}