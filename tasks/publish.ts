/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const util = require('util')
const packageInfo = require('../package.json')
const path = require('path')
const AdmZip = require('adm-zip')
const browsers = require('../browsers')

const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)

const appName = packageInfo.name
const appVersion = packageInfo.version
const rootOutput = 'dist'
const entryOutput = 'build'
const zipFileName = `${appName}-${+new Date()}.zip`
const zip = new AdmZip()

fs.existsSync(`./${rootOutput}`) || fs.mkdirSync(`./${rootOutput}`)

browsers.forEach((browser: string) => {
  fs.existsSync(`./${rootOutput}/${browser}`) ||
    fs.mkdirSync(`./${rootOutput}/${browser}`)
})

async function removeFiles(directory: string): Promise<void> {
  const files = await readdir(directory)
  const unlinkPromises = files.map((filename: string) => {
    const filePath = path.join(directory, filename)
    return unlink(filePath)
  })
  await Promise.all(unlinkPromises)
}

async function publish(): Promise<void> {
  try {
    console.info(`\x1b[1;32m${appName}@${appVersion}\x1b[m`)
    browsers.forEach(async (browser: string) => {
      const entry = path.join(entryOutput, browser)
      const output = path.join(rootOutput, browser)
      if (!fs.existsSync(entry)) {
        throw new Error(
          `${browser} has no build directory, please run npm build.`
        )
      }

      await removeFiles(output)
      zip.addLocalFolder(entry, '')
      zip.writeZip(path.join(output, zipFileName))
      console.info(`\x1b[1;32m${browser} extension ready to be published\x1b[m`)
    })
  } catch (error) {
    console.error(error)
  }
}

publish()
