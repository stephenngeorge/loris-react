const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const { askAtomicDirs, askConfirmSetup } = require('./lib/setup-library/inquirer')
const { mkAtomicDir, mkDirLibrary, writeLibraryJsFile, writeLibraryScssFile } = require('./lib/setup-library/files')

clear()
console.log(figlet.textSync('Loris React', {
    horizontalLayout: "default"
}))

const run = async () => {
    const libRoot = process.cwd()
    const { confirmSetup } = await askConfirmSetup(libRoot) // <-- boolean

    if (confirmSetup) {
        console.log(
            chalk.green('great :) we\'ll set things up for you...')
        )

        /**
         * CREATE FILES
         */
        await writeLibraryJsFile()
        await writeLibraryScssFile()
        await mkDirLibrary()

        // ask which directories to includes & create folder structure
        const { atomicDirs } = await askAtomicDirs()
        atomicDirs.forEach(async dir => {
            await mkAtomicDir(dir)
        })
    }
    else {
        console.log(
            chalk.yellow('no worries, cd into the correct directory and run "loris start" again')
        )
    }
}

run()