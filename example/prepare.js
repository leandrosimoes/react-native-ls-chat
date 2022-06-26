const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const PACKAGE_PATH = path.resolve(__dirname, '../package/lib')
const NODE_MODULES_DEST_PATH = path.resolve(__dirname, 'node_modules')
const PACKAGE_DEST_PATH = path.resolve(__dirname, 'node_modules/react-native-ls-chat')

console.log('Preparing react-native-ls-chat...')
console.log(PACKAGE_PATH, PACKAGE_DEST_PATH)

function createPathIfNotExists(path) {
    return new Promise(resolve => {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }

        resolve()
    })
}

function executeAsync(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error(err)
                reject()
                return
            }
        
            console.log(stdout)
            console.log(stderr)

            resolve()
        })
    })
}

;(async () => {
    try {
        await executeAsync(`rm -rf ${PACKAGE_DEST_PATH}`)
        await createPathIfNotExists(NODE_MODULES_DEST_PATH)
        await createPathIfNotExists(PACKAGE_DEST_PATH)

        await executeAsync(`cp -rf ${PACKAGE_PATH}/* ${PACKAGE_DEST_PATH}`)
    } catch (err) {
        console.error(err)
    }
})()