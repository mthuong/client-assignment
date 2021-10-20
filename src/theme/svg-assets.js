/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const _ = require('lodash')

const svgFileNames = () => {
  const array = fs
    .readdirSync('src/theme/assets/svg')
    .filter(file => {
      return file.endsWith('.svg')
    })
    .map(file => {
      return file.replace('.svg', '')
    })
  return Array.from(new Set(array))
}
const generate = () => {
  const properties = svgFileNames()
    .map(name => {
      const variableName = _.upperFirst(
        _.camelCase(name.replace(/-/g, ' ').replace(/_/g, ' '))
      )

      return `export { default as ${variableName} } from './assets/svg/${name}.svg'`
    })
    .join('\n')

  fs.writeFileSync('src/theme/svg.js', properties, 'utf8')
}
generate()
