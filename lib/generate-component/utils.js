const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDir = source => lstatSync(source).isDirectory()

module.exports = {
    /**
     * ----------
     * STRING MANIPULATION
     * ----------
     */
    // generates a lower case, hyphenated string, e.g.
    // Component Name -> component-name
    transformMachineName: name => {
        return name.toLowerCase().replace(/\s/g, "-")
    },
    // generates a Pascal Case string, e.g.
    // component name -> ComponentName
    transformJSXName: name => {
        const nameArray = name.split(" ")
        return nameArray.map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1)).join("")
    },
    // takes a Pascal Case string and returns a lower case, hyphenated string, e.g.
    // ComponentName -> component-name
    transformComponentToSassName: componentName => {
        return componentName.split(/(?=[A-Z])/g).join("-").toLowerCase()
    },
    /**
     * ----------
     * FS UTILITIES
     * ----------
     */
    // reads the contents of a directory and returns an array of directories therein,
    // @depends on isDir()
    filterForDirs: source => {
        return readdirSync(source).map(entry => join(source, entry)).filter(isDir)
    },
    // reads the contents of a directory and returns an array of files therein,
    // @depends on isDir()
    filterForFiles: source => {
        return readdirSync(source).map(entry => join(source, entry)).filter(!isDir)
    },
    // returns the final section of a file path, e.g.
    // User/myusername/documents/dev -> dev
    getShortPath: path => {
        const pathArray = path.split("/")
        return pathArray[pathArray.length - 1]
    },
    // returns a boolean, true if source dir has directories within
    hasSubDirs: source => {
        return readdirSync(source).map(entry => join(source, entry)).filter(isDir).length > 0
    }
}