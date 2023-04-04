export {}
/* const fs = require('fs')
const path = require('path')
fs.readdir(__dirname, (err: any, files: any[]) => {
  if (err) {
    console.error(err)
    return
  }

  files.forEach((file: string) => {
    if (!file.includes('index')) {
      const dirPath = path.join(__dirname) + '\\'
      fs.readFile(dirPath + file, 'utf-8', (err: any, fileContent: string) => {
        if (err) {
          console.error(err)
          return
        }
        const oldPath = dirPath + file
        const newFileContent = fileContent.replace('var', 'export const')
        fs.writeFile(oldPath, newFileContent, (err: any): void => {
          if (err) {
            return console.error(err)
          }
        })
        const fileName = file.split('.')[0]
        const newPath = dirPath + fileName + '.ts'
        fs.rename(oldPath, newPath, (err: any): void => {
          if (err) {
            return console.error(err)
          }
        })
      })
    }
  })
})
 */
