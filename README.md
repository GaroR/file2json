# file2json
A Simple javascript library to convert positional txt file to Json Object

# Installation

Soon will be released a npm package.
<!-- With [npm](https://www.npmjs.com/) do:

```
npm install file2json
``` -->

# Motivation
while working on one of my projects I had trouble finding a satisfactory library to do this type of task.
I decided to create one and share with those who need it.

# Code Example
The File2Json use a dictionary definition to make the convertion from simple text to Json object.


### Simple Dictionary Example:
```javascript
var dictionary = {
    lineSize: 64,
    lineDefinition: [
        {
            name: "nome",
            position: 0,
            size: 40
        },
        {
            name: "id",
            position: 41,
            size: 5
        },
        {
            name: "data",
            position: 46,
            size: 8
        },
        {
            name: "code",
            position: 54,
            size: 11
        }
    ]
};
```

After defining the dictionary all you have to do is call the converter passing the file loaded by a file type input

```javascript
file2json.convert(file, dictionary);
```

The converter will return a promise that will be solved after the convertion is finalized

```javascript
file2json.convert(file, dictionary)
    .then(function (convertedObject) {
            // so something with the returned object
        });
```

# Test
Soon...

# Changelog
v0.1.0 - Created Basic Convertion Logic

# Lincense
MIT