/**
 * @file config-overrides.js
 * @author TerryYan (465446853yan@gmail.com)
 * the configuration of the file is based on customize-cra and react-app-rewired 
 */

//import relative methods
const {
    override,
    addDecoratorsLegacy,
    fixBabelImports,
    addLessLoader
} = require('customize-cra')

const theme = require('./LessVars')
module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import',{
      library:'antd',
      libraryDirectory:'es',
      style:true,
    }),
    addLessLoader({
      modifyVars:theme,
      javascriptEnabled:true,
    }),
);