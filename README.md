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

### Simple Text File Content Example:

```
john from                               000011988042211111111111
wood toy                                000021988042211111111111
ariel bonilla                           000031988042211111111111
name example                            000041988042211111111111
no name idea                            000051988042211111111111
the last one                            000061988042211111111111
```

### Simple Dictionary Example:

```javascript
var dictionary = {
    lineSize: 64,
    lineDefinition: [
        {
            name: "name",
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

### Converted Object Output:
```javascript
[
    {
        "name": "john from ",
        "id": "00011",
        "data": "98804221",
        "code": "1111111111"
    },
    {
        "name": "wood toy ",
        "id": "00021",
        "data": "98804221",
        "code": "1111111111"
    },
    {
        "name": "ariel bonilla ",
        "id": "00031",
        "data": "98804221",
        "code": "1111111111"
    },
    {
        "name": "name example ",
        "id": "00041",
        "data": "98804221",
        "code": "1111111111"
    },
    {
        "name": "no name idea ",
        "id": "00051",
        "data": "98804221",
        "code": "1111111111"
    },
    {
        "name": "the last one ",
        "id": "00061",
        "data": "98804221",
        "code": "1111111111"
    }
]
```

# Test
Soon...

# Changelog
v0.1.0 - Created Basic Convertion Logic

# Lincense
MIT